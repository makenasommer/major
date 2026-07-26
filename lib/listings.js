import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/lib/firebase";

const LISTINGS_COLLECTION = "listings";

/**
 * Creates a new listing in Firestore. `imageFiles` are uploaded to Storage
 * first, and their download URLs are saved on the listing doc.
 */
export async function createListing({
  sellerId,
  sellerName,
  sellerCampus,
  name,
  description,
  price,
  category,
  condition,
  type, // "buy" | "rent"
  sale,
  rentalOptions,
  imageFiles,
}) {
  const imageUrls = await Promise.all(
    imageFiles.map(async (file) => {
      const storageRef = ref(storage, `listings/${sellerId}/${Date.now()}-${file.name}`);
      await uploadBytes(storageRef, file);
      return getDownloadURL(storageRef);
    })
  );

  const docRef = await addDoc(collection(db, LISTINGS_COLLECTION), {
    sellerId,
    sellerName,
    campus: sellerCampus,
    name,
    description,
    price,
    category,
    condition: condition || null,
    type,
    sale: !!sale,
    rentalOptions: rentalOptions || null,
    images: imageUrls,
    status: "active",
    createdAt: serverTimestamp(),
  });

  return docRef.id;
}

/**
 * Fetches listings with optional filters. Text search (q) and sort are
 * applied client-side after fetching, since Firestore doesn't support
 * full-text search natively.
 */
export async function getListings({ category, type, condition, sale, q, sort } = {}) {
  const constraints = [where("status", "==", "active")];
  if (category) constraints.push(where("category", "==", category));
  if (type) constraints.push(where("type", "==", type));
  if (condition) constraints.push(where("condition", "==", condition));
  if (sale) constraints.push(where("sale", "==", true));

  const q_ = query(collection(db, LISTINGS_COLLECTION), ...constraints);
  const snap = await getDocs(q_);
  let results = snap.docs.map((d) => ({ id: d.id, ...d.data() }));

  if (q) {
    const query_lower = q.toLowerCase();
    results = results.filter(
      (l) =>
        l.name?.toLowerCase().includes(query_lower) ||
        l.description?.toLowerCase().includes(query_lower) ||
        l.category?.toLowerCase().includes(query_lower)
    );
  }

  const getTime = (l) => l.createdAt?.toMillis?.() ?? 0;
  switch (sort) {
    case "price-low":
      results.sort((a, b) => a.price - b.price);
      break;
    case "price-high":
      results.sort((a, b) => b.price - a.price);
      break;
    case "newest":
    default:
      results.sort((a, b) => getTime(b) - getTime(a));
  }

  return results;
}

export async function getListingById(id) {
  const snap = await getDoc(doc(db, LISTINGS_COLLECTION, id));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

export async function getListingsBySeller(sellerId) {
  const q_ = query(collection(db, LISTINGS_COLLECTION), where("sellerId", "==", sellerId));
  const snap = await getDocs(q_);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}
