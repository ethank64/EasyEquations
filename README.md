# Easy Equations

Easy Equations is a Windows desktop application built with **Electron.js** that allows users to input LaTeX code, convert it into a `.tex` file, and generate a `.docx` file using **Pandoc**. The application is fully self-contained, bundling Pandoc so users do not need to install it separately.

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

### **3️⃣ Locate the Installer**
After the build is complete, the **Windows installer** (`.exe`) will be generated inside the `dist/` folder:
```
dist/
└── Easy Equations Setup 1.0.0.exe
```
This `.exe` file can be distributed to users for installation.

---

## 📁 Project Structure
```
EasyEquations/
│-- resources/                # Contains bundled Pandoc executable
│   ├── pandoc/
│       ├── pandoc.exe
│       ├── pandoc-citeproc.exe
│-- src/                      # Main source code
│   ├── main.js               # Electron main process
│   ├── preload.js            # Secure IPC communication
│   ├── index.html            # User interface
│-- package.json              # Project metadata & dependencies
│-- README.md                 # This file
```

---

## 📦 Dependencies
- **Electron** - Desktop app framework  
- **Pandoc** - Converts LaTeX to Word (`.docx`)  
- **Node.js** - JavaScript runtime  

All dependencies are installed via `npm install`.

---

## 📜 License
This project is licensed under the **MIT License**.

---

🚀 **Developed with ❤️ using Electron & Pandoc.**
