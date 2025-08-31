const uniqueColors = [
    // Tailwind Standard Colors
    { class: "text-gray-700", hex: "#374151", type: "tailwind" },
    { class: "text-gray-900", hex: "#111827", type: "tailwind" },
    { class: "text-blue-gray-500", hex: "#64748B", type: "tailwind" },
    { class: "text-blue-gray-600", hex: "#475569", type: "tailwind" },
    { class: "text-blue-gray-400", hex: "#94A3B8", type: "tailwind" },
    { class: "text-blue-gray-200", hex: "#E2E8F0", type: "tailwind" },
    { class: "text-blue-gray-50", hex: "#F8FAFC", type: "tailwind" },
    { class: "text-black", hex: "#000000", type: "tailwind" },
    { class: "text-red-500 / bg-red-500", hex: "#EF4444", type: "tailwind" },
    { class: "text-red-600 / bg-red-600", hex: "#DC2626", type: "tailwind" },
    { class: "text-green-600 / bg-green-600", hex: "#16A34A", type: "tailwind" },
    { class: "text-green-500 / bg-green-500", hex: "#22C55E", type: "tailwind" },
    { class: "text-gray-600", hex: "#4B5563", type: "tailwind" },
    { class: "text-gray-500", hex: "#6B7280", type: "tailwind" },
    { class: "text-gray-400", hex: "#9CA3AF", type: "tailwind" },
    { class: "text-gray-800", hex: "#1F2937", type: "tailwind" },
    { class: "text-orange-400 / bg-orange-400", hex: "#FB923C", type: "tailwind" },
    { class: "text-white / bg-white", hex: "#FFFFFF", type: "tailwind" },
    { class: "bg-gray-200", hex: "#E5E7EB", type: "tailwind" },
    { class: "bg-gray-300", hex: "#D1D5DB", type: "tailwind" },
    { class: "bg-gray-50", hex: "#F9FAFB", type: "tailwind" },
    { class: "bg-gray-100", hex: "#F3F4F6", type: "tailwind" },
    { class: "bg-blue-600", hex: "#2563EB", type: "tailwind" },
    { class: "bg-blue-700", hex: "#1D4ED8", type: "tailwind" },
  
    // CSS Variable Colors
    { class: "text-[var(--color-text)] / bg-[var(--color-text)]", hex: "var(--color-text)", type: "css-var" },
    { class: "text-[var(--color-muted)]", hex: "var(--color-muted)", type: "css-var" },
    { class: "text-[var(--color-primary)] / bg-[var(--color-primary)]", hex: "var(--color-primary)", type: "css-var" },
    { class: "text-[var(--color-primary-text)]", hex: "var(--color-primary-text)", type: "css-var" },
    { class: "text-[var(--color-text-on-primary)] / bg-[var(--color-text-on-primary)]", hex: "var(--color-text-on-primary)", type: "css-var" },
    { class: "text-[var(--color-error)] / bg-[var(--color-error)]", hex: "var(--color-error)", type: "css-var" },
    { class: "text-[var(--color-text-on-warning)] / bg-[var(--color-warning)]", hex: "var(--color-warning)", type: "css-var" },
    { class: "bg-[var(--color-surface)]", hex: "var(--color-surface)", type: "css-var" },
    { class: "bg-[var(--color-success)]", hex: "var(--color-success)", type: "css-var" },
    { class: "bg-[var(--color-highlight)]", hex: "var(--color-highlight)", type: "css-var" },
    { class: "bg-[var(--color-secondary-bg)]", hex: "var(--color-secondary-bg)", type: "css-var" },
    { class: "bg-[var(--color-bg)]", hex: "var(--color-bg)", type: "css-var" },
    { class: "bg-[var(--color-sidebar-bg)]", hex: "var(--color-sidebar-bg)", type: "css-var" }
  ];
  



  | Original Color / Class                                                                              | Hex / CSS Var                                                         | Replace With                                                           |
| --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `bg-[var(--color-bg)]` / `text-[var(--color-text)]`                                                 | `var(--color-bg)` / `var(--color-text)`                               | `--bg-prime` / `--text-prime`                                          |
| `bg-[var(--color-surface)]`                                                                         | `var(--color-surface)`                                                | `--bg-scend`                                                           |
| `bg-green-500` / `bg-green-600` / `text-green-500` / `text-green-600`                               | `#22C55E` / `#16A34A`                                                 | `--bg-success` / `--text-on-success`                                   |
| `bg-red-500` / `bg-red-600` / `text-red-500` / `text-red-600`                                       | `#EF4444` / `#DC2626`                                                 | `--bg-error` / `--text-on-error`                                       |
| `bg-[var(--color-warning)]` / `text-[var(--color-text-on-warning)]`                                 | `var(--color-warning)`                                                | `--bg-warning` / `--text-on-warning`                                   |
| `bg-[var(--color-secondary-bg)]`                                                                    | `var(--color-secondary-bg)`                                           | `--bg-secondary`                                                       |
| `bg-white` / `text-white`                                                                           | `#FFFFFF`                                                             | `--bg-white` / `--text-on-prime`                                       |
| `bg-gray-100` / `bg-gray-200` / `bg-gray-300` / `text-gray-700` / `text-gray-500` / `text-gray-600` | `#F3F4F6` / `#E5E7EB` / `#D1D5DB` / `#374151` / `#6B7280` / `#4B5563` | `--bg-gray` / `--text-secondary`                                       |
| `bg-blue-600` / `bg-blue-700` / `text-blue-gray-500` / `text-blue-gray-600`                         | `#2563EB` / `#1D4ED8` / `#64748B` / `#475569`                         | Optional extra blue shades (optional theme vars)                       |
| `bg-orange-400` / `text-orange-400`                                                                 | `#FB923C`                                                             | Optional extra warning / accent (`--bg-warning` / `--text-on-warning`) |
| `bg-[var(--color-success)]`                                                                         | `var(--color-success)`                                                | `--bg-success`                                                         |
| `bg-[var(--color-primary)]` / `text-[var(--color-primary)]`                                         | `var(--color-primary)`                                                | Could also map to `--bg-prime` / `--text-prime`                        |
| `text-[var(--color-muted)]`                                                                         | `var(--color-muted)`                                                  | `--text-secondary`                                                     |
| `text-[var(--color-text-on-primary)]` / `bg-[var(--color-text-on-primary)]`  
                       | `var(--color-text-on-primary)`                                        | `--text-on-prime`                                                      |







acha ab muhay ye batto ka abhi lo tum nay color js banye hain is us main jo varriable hain wo find waly jajha par konsa kis par replace karo kay ui shadCN jasi laagay
exmple
 
     finding                           replcee
text-gray-700       ====             


find colors acha is main color jo ha wo talwind say diye tha mainy aur kuc var say lakin ap jab kay color js ka code change ho gya ha to wo bhi work nhi kary gay 
const uniqueColors = [
    // Tailwind Standard Colors
    { class: "text-gray-700", hex: "#374151", type: "tailwind" },
    { class: "text-gray-900", hex: "#111827", type: "tailwind" },
    { class: "text-blue-gray-500", hex: "#64748B", type: "tailwind" },
    { class: "text-blue-gray-600", hex: "#475569", type: "tailwind" },
    { class: "text-blue-gray-400", hex: "#94A3B8", type: "tailwind" },
    { class: "text-blue-gray-200", hex: "#E2E8F0", type: "tailwind" },
    { class: "text-blue-gray-50", hex: "#F8FAFC", type: "tailwind" },
    { class: "text-black", hex: "#000000", type: "tailwind" },
    { class: "text-red-500 / bg-red-500", hex: "#EF4444", type: "tailwind" },
    { class: "text-red-600 / bg-red-600", hex: "#DC2626", type: "tailwind" },
    { class: "text-green-600 / bg-green-600", hex: "#16A34A", type: "tailwind" },
    { class: "text-green-500 / bg-green-500", hex: "#22C55E", type: "tailwind" },
    { class: "text-gray-600", hex: "#4B5563", type: "tailwind" },
    { class: "text-gray-500", hex: "#6B7280", type: "tailwind" },
    { class: "text-gray-400", hex: "#9CA3AF", type: "tailwind" },
    { class: "text-gray-800", hex: "#1F2937", type: "tailwind" },
    { class: "text-orange-400 / bg-orange-400", hex: "#FB923C", type: "tailwind" },
    { class: "text-white / bg-white", hex: "#FFFFFF", type: "tailwind" },
    { class: "bg-gray-200", hex: "#E5E7EB", type: "tailwind" },
    { class: "bg-gray-300", hex: "#D1D5DB", type: "tailwind" },
    { class: "bg-gray-50", hex: "#F9FAFB", type: "tailwind" },
    { class: "bg-gray-100", hex: "#F3F4F6", type: "tailwind" },
    { class: "bg-blue-600", hex: "#2563EB", type: "tailwind" },
    { class: "bg-blue-700", hex: "#1D4ED8", type: "tailwind" },
  
    // CSS Variable Colors
    { class: "text-[var(--color-text)] / bg-[var(--color-text)]", hex: "var(--color-text)", type: "css-var" },
    { class: "text-[var(--color-muted)]", hex: "var(--color-muted)", type: "css-var" },
    { class: "text-[var(--color-primary)] / bg-[var(--color-primary)]", hex: "var(--color-primary)", type: "css-var" },
    { class: "text-[var(--color-primary-text)]", hex: "var(--color-primary-text)", type: "css-var" },
    { class: "text-[var(--color-text-on-primary)] / bg-[var(--color-text-on-primary)]", hex: "var(--color-text-on-primary)", type: "css-var" },
    { class: "text-[var(--color-error)] / bg-[var(--color-error)]", hex: "var(--color-error)", type: "css-var" },
    { class: "text-[var(--color-text-on-warning)] / bg-[var(--color-warning)]", hex: "var(--color-warning)", type: "css-var" },
    { class: "bg-[var(--color-surface)]", hex: "var(--color-surface)", type: "css-var" },
    { class: "bg-[var(--color-success)]", hex: "var(--color-success)", type: "css-var" },
    { class: "bg-[var(--color-highlight)]", hex: "var(--color-highlight)", type: "css-var" },
    { class: "bg-[var(--color-secondary-bg)]", hex: "var(--color-secondary-bg)", type: "css-var" },
    { class: "bg-[var(--color-bg)]", hex: "var(--color-bg)", type: "css-var" },
    { class: "bg-[var(--color-sidebar-bg)]", hex: "var(--color-sidebar-bg)", type: "css-var" }
  ];
  



Perfect 👌 ab samajh gaya tum kya puchh rahe ho.
Tum VS Code ka **Search & Replace in Files (Ctrl + Shift + H)** use karna chahte ho aur specifically **sirf `client/src/pages`** ke andar search/replace karna chahte ho.

Uske liye tumko inputs me yeh dalna hoga:

---

### 🔹 Ctrl + Shift + H → Inputs fill karo:

1. **Search (from history):**
   jo text dhoondhna hai (e.g. `bg-white`)

2. **Replace:**
   jo lagana hai (e.g. `bg-[var(--color-surface)]`)

3. **Files to include:**

   ```bash
   client/src/pages/**
   ```

   ⚡ Iska matlab hai: sirf `pages` aur uske subfolders ke andar search hoga.

4. **Files to exclude:**
   blank chhodo (ya agar kuch exclude karna hai to us folder ka path de do).

---

### 🔹 Example run:

Agar tumhe **sab `bg-white` replace karke apne color system me shift karna hai**:

* **Search:**

  ```text
  bg-white
  ```
* **Replace:**

  ```text
  bg-[var(--color-surface)]
  ```
* **Files to include:**

  ```text
  client/src/pages/**
  ```
* **Files to exclude:**
  *(blank)*

---

### 🔹 Another example (text-gray → muted text color):

* **Search:**

  ```text
  text-gray-400
  ```
* **Replace:**

  ```text
  text-[var(--color-muted)]
  ```
* **Files to include:**

  ```text
  client/src/pages/**
  ```

---

👉 Is tarah tum ek ek Tailwind class ko apne **theme variables (colors.js + CSS vars)** ke according replace kar sakte ho, bina baaki project ko affect kiye.

---

Fahad bhai, chaho to main tumhare liye **ready-made Search → Replace table bana du (bg-white, text-gray, text-black, hover\:bg-gray-50 …)** taake tum bas ek ek copy-paste karke replace run kar do.

Bataun kya main wo poora table bana kar de doon?
