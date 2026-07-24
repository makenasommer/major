path = "/Users/makenasommerpartington/Downloads/major-main/components/CountrySelector.js"
with open(path) as f:
    content = f.read()

old = "fontFamily: var(--font),"
new = 'fontFamily: "var(--font)",'

count = content.count(old)
content = content.replace(old, new)

with open(path, "w") as f:
    f.write(content)

print(f"Fixed {count} instance(s)")
