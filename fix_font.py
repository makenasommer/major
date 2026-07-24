path = "/Users/makenasommerpartington/Downloads/major-main/components/CountrySelector.js"
with open(path) as f:
    content = f.read()

old = "\"'Helvetica Neue', Helvetica, Arial, sans-serif\""
new = "var(--font)"

count = content.count(old)
content = content.replace(old, new)

with open(path, "w") as f:
    f.write(content)

print(f"Replaced {count} instance(s)")
