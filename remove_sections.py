import re
path = "/Users/makenasommerpartington/Downloads/major-main/app/page.js"
with open(path) as f:
    content = f.read()

# Remove everything from "{/* How It Works */}" through the closing of the CTA banners section,
# right before "<Footer />"
pattern = re.compile(r"\{/\* How It Works \*/\}.*?(?=<Footer />)", re.DOTALL)
new_content, count = pattern.subn("", content)

with open(path, "w") as f:
    f.write(new_content)

print(f"Removed {count} section(s)")
