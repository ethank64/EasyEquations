# Easy Equations

Easy Equations is an application built with **Electron.js** that allows users to input LaTeX code, convert it into a `.tex` file, and generate a `.docx` file using **Pandoc**. The application is fully self-contained, bundling Pandoc so users do not need to install it separately.

Pandoc is too big for this repo, so you'll need to download it here: https://github.com/jgm/pandoc/releases/tag/3.6.3 and put it in a folder called "resources". Make sure that the pandoc executable is at resources/pandoc/nameOfExecutable. This is only for compiling the project locally from the source code. Go to the **releases** tab if you want to just use the application.

## 🚀 Getting Started

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/yourusername/EasyEquations.git
cd EasyEquations
```

### **2️⃣ Install Dependencies**
```sh
npm install
```

### **3️⃣ Run the Application**
```sh
npm run start
```
This launches the app using Electron.

---

## 🔨 Building for Windows

To package the application as a **Windows `.exe` installer**, follow these steps:

### **1️⃣ Ensure `electron-builder` is Installed**
```sh
npm install --save-dev electron-builder
```

### **2️⃣ Build the Windows Installer**
```sh
npm run build --win
```
(For mac it's just --mac instead)

### **3️⃣ Locate the Installer**
After the build is complete, the **Windows installer** (`.exe`) will be generated inside the `dist/` folder:
```
dist/
└── Easy Equations Setup 1.0.0.exe
```
This `.exe` file can be distributed to users for installation.

---

---

## 📦 Dependencies
- **Electron** - Desktop app framework  
- **Node.js** - JavaScript runtime  

All dependencies are installed via `npm install`.

---

🚀 **Developed with ❤️ using Electron & Pandoc.**
