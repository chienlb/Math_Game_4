module.exports = [
"[project]/lib/planet-textures.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createPlanetNormalMap",
    ()=>createPlanetNormalMap,
    "createPlanetTexture",
    ()=>createPlanetTexture
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-ssr] (ecmascript)");
;
function createPlanetTexture(baseColor, size = 512, options) {
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    const gradientIntensity = options?.gradientIntensity ?? 0.6;
    const noiseScale = options?.noiseScale ?? 0.1;
    const patternType = options?.patternType ?? "smooth";
    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size / 2;
    // Base color
    const baseColorObj = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Color"](baseColor);
    const r = Math.floor(baseColorObj.r * 255);
    const g = Math.floor(baseColorObj.g * 255);
    const b = Math.floor(baseColorObj.b * 255);
    // Create realistic radial gradient for sphere effect with better lighting
    const gradient = ctx.createRadialGradient(centerX * 0.65, centerY * 0.65, 0, centerX, centerY, radius);
    // Light side (top-left) - brighter highlight
    const lightR = Math.min(255, r + 80);
    const lightG = Math.min(255, g + 80);
    const lightB = Math.min(255, b + 80);
    // Mid-tone
    const midR = Math.min(255, r + 20);
    const midG = Math.min(255, g + 20);
    const midB = Math.min(255, b + 20);
    // Dark side (bottom-right) - deeper shadow
    const darkR = Math.max(0, r - 60);
    const darkG = Math.max(0, g - 60);
    const darkB = Math.max(0, b - 60);
    gradient.addColorStop(0, `rgb(${lightR}, ${lightG}, ${lightB})`);
    gradient.addColorStop(0.3, `rgb(${midR}, ${midG}, ${midB})`);
    gradient.addColorStop(0.6, `rgb(${r}, ${g}, ${b})`);
    gradient.addColorStop(1, `rgb(${darkR}, ${darkG}, ${darkB})`);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
    // Add surface patterns
    if (patternType === "rough") {
        // Add realistic noise/texture with better distribution
        const imageData = ctx.getImageData(0, 0, size, size);
        const data = imageData.data;
        for(let i = 0; i < data.length; i += 4){
            const x = i / 4 % size;
            const y = Math.floor(i / 4 / size);
            const dist = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
            if (dist < radius) {
                // Perlin-like noise with multiple octaves
                const noise1 = (Math.random() - 0.5) * 25;
                const noise2 = (Math.random() - 0.5) * 15;
                const noise3 = (Math.random() - 0.5) * 8;
                const totalNoise = noise1 + noise2 * 0.5 + noise3 * 0.25;
                // Add some color variation
                const colorVariation = (Math.random() - 0.5) * 10;
                data[i] = Math.max(0, Math.min(255, data[i] + totalNoise + colorVariation)); // R
                data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + totalNoise)); // G
                data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + totalNoise - colorVariation)); // B
            }
        }
        ctx.putImageData(imageData, 0, 0);
    } else if (patternType === "clouds") {
        // Add realistic cloud-like patterns with better layering
        for(let i = 0; i < 30; i++){
            const cloudX = centerX + (Math.random() - 0.5) * radius * 1.5;
            const cloudY = centerY + (Math.random() - 0.5) * radius * 1.5;
            const cloudRadius = radius * (0.08 + Math.random() * 0.25);
            // Main cloud
            const cloudGradient = ctx.createRadialGradient(cloudX, cloudY, 0, cloudX, cloudY, cloudRadius);
            cloudGradient.addColorStop(0, `rgba(255, 255, 255, ${0.4 + Math.random() * 0.3})`);
            cloudGradient.addColorStop(0.6, `rgba(255, 255, 255, ${0.2 + Math.random() * 0.2})`);
            cloudGradient.addColorStop(1, "rgba(255, 255, 255, 0)");
            ctx.fillStyle = cloudGradient;
            ctx.beginPath();
            ctx.arc(cloudX, cloudY, cloudRadius, 0, Math.PI * 2);
            ctx.fill();
            // Add smaller cloud details for realism
            if (Math.random() > 0.5) {
                const detailX = cloudX + (Math.random() - 0.5) * cloudRadius * 0.8;
                const detailY = cloudY + (Math.random() - 0.5) * cloudRadius * 0.8;
                const detailRadius = cloudRadius * (0.4 + Math.random() * 0.3);
                const detailGradient = ctx.createRadialGradient(detailX, detailY, 0, detailX, detailY, detailRadius);
                detailGradient.addColorStop(0, `rgba(255, 255, 255, ${0.3 + Math.random() * 0.2})`);
                detailGradient.addColorStop(1, "rgba(255, 255, 255, 0)");
                ctx.fillStyle = detailGradient;
                ctx.beginPath();
                ctx.arc(detailX, detailY, detailRadius, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    } else if (patternType === "craters") {
        // Add realistic crater-like patterns with rim highlights
        for(let i = 0; i < 20; i++){
            const craterX = centerX + (Math.random() - 0.5) * radius * 1.5;
            const craterY = centerY + (Math.random() - 0.5) * radius * 1.5;
            const craterRadius = radius * (0.04 + Math.random() * 0.12);
            // Crater shadow (darker center)
            const craterGradient = ctx.createRadialGradient(craterX - craterRadius * 0.4, craterY - craterRadius * 0.4, 0, craterX, craterY, craterRadius);
            craterGradient.addColorStop(0, `rgba(0, 0, 0, ${0.5 + Math.random() * 0.3})`);
            craterGradient.addColorStop(0.7, `rgba(0, 0, 0, ${0.2 + Math.random() * 0.2})`);
            craterGradient.addColorStop(1, "rgba(0, 0, 0, 0)");
            ctx.fillStyle = craterGradient;
            ctx.beginPath();
            ctx.arc(craterX, craterY, craterRadius, 0, Math.PI * 2);
            ctx.fill();
            // Add rim highlight for realism
            const rimX = craterX + craterRadius * 0.3;
            const rimY = craterY + craterRadius * 0.3;
            const rimGradient = ctx.createRadialGradient(rimX, rimY, 0, rimX, rimY, craterRadius * 0.3);
            rimGradient.addColorStop(0, `rgba(255, 255, 255, ${0.2 + Math.random() * 0.2})`);
            rimGradient.addColorStop(1, "rgba(255, 255, 255, 0)");
            ctx.fillStyle = rimGradient;
            ctx.beginPath();
            ctx.arc(rimX, rimY, craterRadius * 0.3, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    // Add realistic highlight for sphere effect (Fresnel-like)
    const highlightGradient = ctx.createRadialGradient(centerX * 0.55, centerY * 0.55, 0, centerX * 0.55, centerY * 0.55, radius * 0.5);
    highlightGradient.addColorStop(0, "rgba(255, 255, 255, 0.5)");
    highlightGradient.addColorStop(0.5, "rgba(255, 255, 255, 0.2)");
    highlightGradient.addColorStop(1, "rgba(255, 255, 255, 0)");
    ctx.fillStyle = highlightGradient;
    ctx.beginPath();
    ctx.arc(centerX * 0.55, centerY * 0.55, radius * 0.5, 0, Math.PI * 2);
    ctx.fill();
    // Add secondary highlight for more depth
    const secondaryHighlight = ctx.createRadialGradient(centerX * 0.7, centerY * 0.7, 0, centerX * 0.7, centerY * 0.7, radius * 0.3);
    secondaryHighlight.addColorStop(0, "rgba(255, 255, 255, 0.3)");
    secondaryHighlight.addColorStop(1, "rgba(255, 255, 255, 0)");
    ctx.fillStyle = secondaryHighlight;
    ctx.beginPath();
    ctx.arc(centerX * 0.7, centerY * 0.7, radius * 0.3, 0, Math.PI * 2);
    ctx.fill();
    const texture = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CanvasTexture"](canvas);
    texture.wrapS = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RepeatWrapping"];
    texture.wrapT = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RepeatWrapping"];
    return texture;
}
function createPlanetNormalMap(size = 512) {
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size / 2;
    const imageData = ctx.createImageData(size, size);
    const data = imageData.data;
    for(let y = 0; y < size; y++){
        for(let x = 0; x < size; x++){
            const dist = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
            const index = (y * size + x) * 4;
            if (dist < radius) {
                // Normal map: RGB = XYZ * 0.5 + 0.5
                const nx = (x - centerX) / radius;
                const ny = (y - centerY) / radius;
                const nz = Math.sqrt(Math.max(0, 1 - nx * nx - ny * ny));
                // Add some noise for surface detail
                const noise = (Math.random() - 0.5) * 0.1;
                const finalNz = Math.max(0, Math.min(1, nz + noise));
                data[index] = Math.floor((nx * 0.5 + 0.5) * 255); // R
                data[index + 1] = Math.floor((ny * 0.5 + 0.5) * 255); // G
                data[index + 2] = Math.floor((finalNz * 0.5 + 0.5) * 255); // B
                data[index + 3] = 255; // A
            } else {
                data[index] = 128;
                data[index + 1] = 128;
                data[index + 2] = 255;
                data[index + 3] = 0;
            }
        }
    }
    ctx.putImageData(imageData, 0, 0);
    const texture = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CanvasTexture"](canvas);
    texture.wrapS = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RepeatWrapping"];
    texture.wrapT = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RepeatWrapping"];
    return texture;
}
}),
"[project]/components/solar-system-background.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SolarSystemBackground
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.module.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$planet$2d$textures$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/planet-textures.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
const STAR_COUNT = 2000;
const SUN_RADIUS = 12;
const SUN_GLOW_RADIUS_1 = 13.5;
const SUN_GLOW_RADIUS_2 = 15.5;
const SUN_GLOW_RADIUS_3 = 18;
const PLANETS = [
    {
        name: "Mercury",
        size: 4,
        distance: 28,
        speed: 0.08,
        color: 0x8c7853,
        emissive: 0x4a3d2a,
        rings: false,
        glowColor: 0xaa9066,
        patternType: "craters"
    },
    {
        name: "Venus",
        size: 5,
        distance: 42,
        speed: 0.03,
        color: 0xffc649,
        emissive: 0xffaa00,
        rings: false,
        glowColor: 0xffd880,
        patternType: "clouds"
    },
    {
        name: "Earth",
        size: 4.8,
        distance: 58,
        speed: 0.018,
        color: 0x2e7cde,
        emissive: 0x1a4a8a,
        rings: false,
        glowColor: 0x4a9eff,
        patternType: "clouds"
    },
    {
        name: "Mars",
        size: 4.2,
        distance: 75,
        speed: 0.012,
        color: 0xe27b58,
        emissive: 0x8a4a35,
        rings: false,
        glowColor: 0xff9d7a,
        patternType: "rough"
    }
];
function SolarSystemBackground() {
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [hoveredPlanet, setHoveredPlanet] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const raycasterRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const mouseRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])({
        x: 0,
        y: 0
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!containerRef.current) return;
        const container = containerRef.current;
        const width = window.innerWidth;
        const height = window.innerHeight;
        const scene = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Scene"]();
        const camera = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PerspectiveCamera"](75, width / height, 0.1, 10000);
        const renderer = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["WebGLRenderer"]({
            antialias: true,
            alpha: true
        });
        camera.position.z = 100;
        renderer.setSize(width, height);
        renderer.setClearColor(0x0a0e27, 1);
        renderer.outputColorSpace = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SRGBColorSpace"];
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PCFSoftShadowMap"];
        container.appendChild(renderer.domElement);
        // Enhanced stars background with twinkling
        const starsGeometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BufferGeometry"]();
        const starPositions = new Float32Array(STAR_COUNT * 3);
        const starSizes = new Float32Array(STAR_COUNT);
        const starOpacities = new Float32Array(STAR_COUNT);
        for(let i = 0; i < STAR_COUNT * 3; i += 3){
            starPositions[i] = (Math.random() - 0.5) * 2000;
            starPositions[i + 1] = (Math.random() - 0.5) * 2000;
            starPositions[i + 2] = (Math.random() - 0.5) * 2000;
            starSizes[i / 3] = Math.random() * 2 + 0.5;
            starOpacities[i / 3] = Math.random();
        }
        starsGeometry.setAttribute("position", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BufferAttribute"](starPositions, 3));
        starsGeometry.setAttribute("size", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BufferAttribute"](starSizes, 1));
        starsGeometry.setAttribute("opacity", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BufferAttribute"](starOpacities, 1));
        const starsMaterial = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PointsMaterial"]({
            color: 0xffffff,
            sizeAttenuation: true,
            transparent: true,
            opacity: 1,
            blending: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdditiveBlending"]
        });
        const stars = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Points"](starsGeometry, starsMaterial);
        scene.add(stars);
        // Enhanced Sun with realistic texture
        const sunGroup = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Group"]();
        // Create sun texture
        const sunTexture = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$planet$2d$textures$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createPlanetTexture"])(0xfdb813, 512, {
            gradientIntensity: 0.8,
            patternType: "smooth"
        });
        // Main sun with texture
        const sunGeometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SphereGeometry"](SUN_RADIUS, 64, 64);
        const sunMaterial = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
            map: sunTexture,
            emissive: 0xfdb813,
            emissiveIntensity: 1.5,
            metalness: 0.1,
            roughness: 0.2
        });
        const sun = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"](sunGeometry, sunMaterial);
        sun.castShadow = true;
        sunGroup.add(sun);
        // Multiple glow layers
        for(let i = 0; i < 4; i++){
            const glowRadius = SUN_RADIUS + 1.5 + i * 2;
            const glowGeometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SphereGeometry"](glowRadius, 32, 32);
            const glowMaterial = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
                color: i === 0 ? 0xffa500 : i === 1 ? 0xff8c00 : i === 2 ? 0xff6b00 : 0xff4500,
                transparent: true,
                opacity: 0.4 - i * 0.08,
                side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BackSide"]
            });
            const glow = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"](glowGeometry, glowMaterial);
            sunGroup.add(glow);
        }
        scene.add(sunGroup);
        // Create realistic planets with textures
        const planetGroups = [];
        const planetMeshes = [];
        PLANETS.forEach((planet)=>{
            const planetGroup = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Group"]();
            // Orbit line with glow
            const orbitGeometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BufferGeometry"]();
            const orbitPoints = [];
            for(let i = 0; i <= 256; i++){
                const angle = i / 256 * Math.PI * 2;
                orbitPoints.push(Math.cos(angle) * planet.distance, 0, Math.sin(angle) * planet.distance);
            }
            orbitGeometry.setAttribute("position", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BufferAttribute"](new Float32Array(orbitPoints), 3));
            // Outer glow orbit
            const orbitGlowMaterial = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LineBasicMaterial"]({
                color: planet.glowColor,
                transparent: true,
                opacity: 0.08,
                linewidth: 2
            });
            const orbitGlow = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Line"](orbitGeometry, orbitGlowMaterial);
            scene.add(orbitGlow);
            // Main orbit line
            const orbitMaterial = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LineBasicMaterial"]({
                color: 0x4a5568,
                transparent: true,
                opacity: 0.4,
                linewidth: 1
            });
            const orbit = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Line"](orbitGeometry, orbitMaterial);
            scene.add(orbit);
            // Create realistic planet with texture
            const planetGeometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SphereGeometry"](planet.size, 64, 64);
            // Create planet texture
            const planetTexture = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$planet$2d$textures$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createPlanetTexture"])(planet.color, 512, {
                gradientIntensity: 0.7,
                patternType: planet.patternType
            });
            // Create normal map for surface detail
            const normalMap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$planet$2d$textures$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createPlanetNormalMap"])(512);
            const planetMaterial = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
                map: planetTexture,
                normalMap: normalMap,
                normalScale: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector2"](0.8, 0.8),
                color: planet.color,
                emissive: planet.emissive,
                emissiveIntensity: 0.15,
                metalness: 0.05,
                roughness: 0.85,
                envMapIntensity: 1.0
            });
            const planetMesh = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"](planetGeometry, planetMaterial);
            planetMesh.castShadow = true;
            planetMesh.receiveShadow = true;
            planetGroup.add(planetMesh);
            // Subtle glow around planet
            const glowGeometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SphereGeometry"](planet.size * 1.15, 32, 32);
            const glowMaterial = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
                color: planet.glowColor,
                transparent: true,
                opacity: 0.2,
                side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BackSide"]
            });
            const glow = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"](glowGeometry, glowMaterial);
            planetGroup.add(glow);
            // Add orbiting particles around planet
            const particleCount = 6;
            for(let i = 0; i < particleCount; i++){
                const particleGeom = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SphereGeometry"](0.12, 12, 12);
                const particleMat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
                    color: planet.glowColor,
                    transparent: true,
                    opacity: 0.5,
                    blending: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdditiveBlending"]
                });
                const particle = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"](particleGeom, particleMat);
                const angle = i / particleCount * Math.PI * 2;
                particle.userData = {
                    angle: angle,
                    distance: planet.size * 1.8,
                    speed: 0.04
                };
                planetGroup.add(particle);
            }
            // Store planet data
            planetGroup.userData = {
                angle: Math.random() * Math.PI * 2,
                ...planet,
                hovered: false
            };
            scene.add(planetGroup);
            planetGroups.push(planetGroup);
            planetMeshes.push(planetMesh);
        });
        // Enhanced lighting for realistic spheres
        const ambientLight = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AmbientLight"](0xffffff, 0.6);
        scene.add(ambientLight);
        const sunLight = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PointLight"](0xfdb813, 4, 300);
        sunLight.position.copy(sun.position);
        sunLight.castShadow = true;
        sunLight.shadow.mapSize.width = 2048;
        sunLight.shadow.mapSize.height = 2048;
        scene.add(sunLight);
        // Directional light from sun for better sphere lighting
        const directionalLight = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DirectionalLight"](0xfdb813, 2);
        directionalLight.position.set(0, 0, 0);
        directionalLight.castShadow = true;
        scene.add(directionalLight);
        // Additional accent lights for depth
        const accentLight1 = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PointLight"](0x00d9ff, 1, 200);
        accentLight1.position.set(-120, 60, 60);
        scene.add(accentLight1);
        const accentLight2 = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PointLight"](0xff006e, 0.8, 200);
        accentLight2.position.set(120, -60, 60);
        scene.add(accentLight2);
        // Raycaster for interaction
        const raycaster = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Raycaster"]();
        raycasterRef.current = raycaster;
        // Mouse tracking
        const handleMouseMove = (e)=>{
            mouseRef.current.x = e.clientX / width * 2 - 1;
            mouseRef.current.y = -(e.clientY / height) * 2 + 1;
        };
        const handleClick = (e)=>{
            const mouse = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector2"]();
            mouse.x = e.clientX / width * 2 - 1;
            mouse.y = -(e.clientY / height) * 2 + 1;
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(planetMeshes, true);
            if (intersects.length > 0) {
                const planetMesh = intersects[0].object;
                const planetGroup = planetMesh.parent;
                if (planetGroup && planetGroup.userData.name) {
                    console.log(`Clicked on ${planetGroup.userData.name}`);
                }
            }
        };
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("click", handleClick);
        const handleResize = ()=>{
            const newWidth = window.innerWidth;
            const newHeight = window.innerHeight;
            camera.aspect = newWidth / newHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(newWidth, newHeight);
        };
        window.addEventListener("resize", handleResize);
        // Animation loop with frame limiting
        let animationId;
        let lastTime = 0;
        const targetFPS = 60;
        const frameInterval = 1000 / targetFPS;
        const animate = ()=>{
            animationId = requestAnimationFrame(animate);
            const currentTime = Date.now();
            const deltaTime = currentTime - lastTime;
            if (deltaTime < frameInterval) return;
            lastTime = currentTime - deltaTime % frameInterval;
            const time = currentTime * 0.001;
            // Rotate sun with enhanced effects
            sunGroup.rotation.y += 0.004;
            sunGroup.children.forEach((child, i)=>{
                if (i > 0) {
                    child.rotation.y += (0.002 - i * 0.0005) * (i % 2 === 0 ? 1 : -1);
                }
            });
            // Pulsing sun glow
            const pulseScale = 1 + Math.sin(time * 1.5) * 0.15;
            if (sunGroup.children[1]) {
                sunGroup.children[1].scale.set(pulseScale, pulseScale, pulseScale);
            }
            // Animate planets with realistic rotation
            planetGroups.forEach((planetGroup)=>{
                const planetData = planetGroup.userData;
                // Orbital motion
                planetData.angle += planetData.speed;
                planetGroup.position.x = Math.cos(planetData.angle) * planetData.distance;
                planetGroup.position.z = Math.sin(planetData.angle) * planetData.distance;
                // Realistic rotation (planets rotate on their axis)
                planetGroup.rotation.y += 0.015;
                planetGroup.rotation.x = Math.sin(planetData.angle * 0.3) * 0.05;
                // Subtle y wobble
                planetGroup.position.y = Math.sin(planetData.angle * 0.5) * 2;
                // Subtle scale pulsing
                const scale = 1 + Math.sin(time * 0.5 + planetData.angle) * 0.05;
                planetGroup.scale.set(scale, scale, scale);
                // Animate orbiting particles
                planetGroup.children.forEach((child)=>{
                    if (child instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"] && child.userData.angle !== undefined) {
                        child.userData.angle += child.userData.speed;
                        const angle = child.userData.angle;
                        const distance = child.userData.distance;
                        child.position.x = Math.cos(angle) * distance;
                        child.position.y = Math.sin(angle * 0.7) * distance;
                        child.position.z = Math.sin(angle * 1.2) * distance * 0.5;
                        child.rotation.x += 0.05;
                        child.rotation.y += 0.05;
                        // Pulsing particles
                        const particlePulse = Math.sin(time * 3 + child.userData.angle) * 0.3 + 0.7;
                        child.scale.set(particlePulse, particlePulse, particlePulse);
                    }
                });
                // Hover effect detection
                const planetIndex = planetGroups.indexOf(planetGroup);
                if (planetIndex >= 0 && planetIndex < planetMeshes.length) {
                    raycaster.setFromCamera(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector2"](mouseRef.current.x, mouseRef.current.y), camera);
                    const intersects = raycaster.intersectObject(planetMeshes[planetIndex], true);
                    const isHovered = intersects.length > 0;
                    if (isHovered && !planetData.hovered) {
                        planetData.hovered = true;
                        setHoveredPlanet(planetData.name);
                    } else if (!isHovered && planetData.hovered) {
                        planetData.hovered = false;
                        setHoveredPlanet((prev)=>prev === planetData.name ? null : prev);
                    }
                    // Hover scale effect
                    if (planetData.hovered) {
                        const hoverScale = 1.2;
                        planetGroup.scale.lerp(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](hoverScale, hoverScale, hoverScale), 0.1);
                    } else {
                        planetGroup.scale.lerp(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector3"](1, 1, 1), 0.1);
                    }
                }
            });
            // Enhanced camera movement based on mouse
            camera.position.x += (mouseRef.current.x * 20 - camera.position.x) * 0.03;
            camera.position.y += (mouseRef.current.y * 20 - camera.position.y) * 0.03;
            camera.lookAt(scene.position);
            // Twinkling stars
            const opacities = starsGeometry.attributes.opacity.array;
            for(let i = 0; i < STAR_COUNT; i++){
                opacities[i] = Math.sin(time * 2 + i) * 0.5 + 0.5;
            }
            starsGeometry.attributes.opacity.needsUpdate = true;
            // Rotate stars slowly
            stars.rotation.y += 0.00003;
            renderer.render(scene, camera);
        };
        animate();
        return ()=>{
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("click", handleClick);
            cancelAnimationFrame(animationId);
            // Cleanup textures
            sunTexture.dispose();
            planetMeshes.forEach((mesh)=>{
                if (mesh.material instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]) {
                    if (mesh.material.map) mesh.material.map.dispose();
                    if (mesh.material.normalMap) mesh.material.normalMap.dispose();
                }
            });
            // Cleanup geometries and materials
            scene.traverse((object)=>{
                if (object instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"] || object instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Line"] || object instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Points"]) {
                    if (object.geometry) object.geometry.dispose();
                    if (object.material) {
                        if (Array.isArray(object.material)) {
                            object.material.forEach((material)=>material.dispose());
                        } else {
                            object.material.dispose();
                        }
                    }
                }
            });
            renderer.dispose();
            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
        };
    }, [
        hoveredPlanet
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            ref: containerRef,
            className: "fixed inset-0 -z-20"
        }, void 0, false, {
            fileName: "[project]/components/solar-system-background.tsx",
            lineNumber: 479,
            columnNumber: 7
        }, this)
    }, void 0, false);
}
}),
"[project]/app/sort-sequence/guide/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SortSequenceGuidePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-ssr] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/play.js [app-ssr] (ecmascript) <export default as Play>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$solar$2d$system$2d$background$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/solar-system-background.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
function SortSequenceGuidePage() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$solar$2d$system$2d$background$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/app/sort-sequence/guide/page.tsx",
                lineNumber: 13,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-10 overflow-y-auto",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-gradient-to-br from-indigo-950 via-indigo-950/80 to-indigo-950 z-0"
                    }, void 0, false, {
                        fileName: "[project]/app/sort-sequence/guide/page.tsx",
                        lineNumber: 16,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.25),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(139,92,246,0.25),transparent_50%)] pointer-events-none z-0"
                    }, void 0, false, {
                        fileName: "[project]/app/sort-sequence/guide/page.tsx",
                        lineNumber: 18,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(79,70,229,0.15),transparent_60%)] pointer-events-none z-0"
                    }, void 0, false, {
                        fileName: "[project]/app/sort-sequence/guide/page.tsx",
                        lineNumber: 19,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                        className: "relative z-10 w-full px-3 py-6 sm:px-4 sm:py-8",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "glass-strong p-5 sm:p-6 rounded-xl max-w-3xl w-full mx-auto border-2 border-indigo-400/60 shadow-2xl relative bg-gradient-to-br from-indigo-950/50 via-indigo-950/40 to-indigo-950/50 backdrop-blur-xl",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                                    className: "mb-5 flex items-center justify-between",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>router.push("/"),
                                        className: "btn-modern flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-indigo-600 to-indigo-600 hover:from-indigo-500 hover:to-indigo-500 text-white rounded-lg font-semibold shadow-lg transition-all duration-200 hover:scale-105 text-xs sm:text-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                                size: 16
                                            }, void 0, false, {
                                                fileName: "[project]/app/sort-sequence/guide/page.tsx",
                                                lineNumber: 27,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Về Trang Chủ"
                                            }, void 0, false, {
                                                fileName: "[project]/app/sort-sequence/guide/page.tsx",
                                                lineNumber: 28,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/sort-sequence/guide/page.tsx",
                                        lineNumber: 23,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/sort-sequence/guide/page.tsx",
                                    lineNumber: 22,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-center mb-6",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-4xl sm:text-5xl mb-3 animate-bounce-gentle",
                                                    children: "📊"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/sort-sequence/guide/page.tsx",
                                                    lineNumber: 34,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                    className: "text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-indigo-300 to-indigo-300 mb-3 drop-shadow-2xl",
                                                    children: "Hướng Dẫn: Sắp Xếp Dãy Số"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/sort-sequence/guide/page.tsx",
                                                    lineNumber: 35,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-indigo-200 text-base sm:text-lg font-semibold",
                                                    children: "Sắp xếp các số theo quy luật tăng dần"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/sort-sequence/guide/page.tsx",
                                                    lineNumber: 38,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/sort-sequence/guide/page.tsx",
                                            lineNumber: 33,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                            className: "space-y-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                    className: "text-xl sm:text-2xl font-black text-indigo-300 flex items-center gap-2 drop-shadow-lg",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-xl",
                                                            children: "📋"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/sort-sequence/guide/page.tsx",
                                                            lineNumber: 45,
                                                            columnNumber: 19
                                                        }, this),
                                                        " Cách Chơi"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/sort-sequence/guide/page.tsx",
                                                    lineNumber: 44,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "glass p-4 sm:p-5 rounded-xl border-2 border-indigo-500/40 space-y-3 bg-gradient-to-br from-indigo-950/20 to-indigo-950/20",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex gap-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500/50 to-indigo-500/50 flex items-center justify-center font-black text-white text-base shadow-lg",
                                                                    children: "1"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/sort-sequence/guide/page.tsx",
                                                                    lineNumber: 49,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex-1",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                            className: "font-black text-indigo-100 mb-1.5 text-base",
                                                                            children: "Xem các số cần sắp xếp"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/sort-sequence/guide/page.tsx",
                                                                            lineNumber: 53,
                                                                            columnNumber: 23
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-indigo-200/90 text-sm leading-relaxed",
                                                                            children: "Ở phần trên, bạn sẽ thấy các số cần được sắp xếp theo quy luật."
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/sort-sequence/guide/page.tsx",
                                                                            lineNumber: 54,
                                                                            columnNumber: 23
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/sort-sequence/guide/page.tsx",
                                                                    lineNumber: 52,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/sort-sequence/guide/page.tsx",
                                                            lineNumber: 48,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex gap-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500/50 to-indigo-500/50 flex items-center justify-center font-black text-white text-base shadow-lg",
                                                                    children: "2"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/sort-sequence/guide/page.tsx",
                                                                    lineNumber: 60,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex-1",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                            className: "font-black text-indigo-100 mb-1.5 text-base",
                                                                            children: "Chọn số"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/sort-sequence/guide/page.tsx",
                                                                            lineNumber: 64,
                                                                            columnNumber: 23
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-indigo-200/90 text-sm leading-relaxed",
                                                                            children: "Click vào một số để chọn nó. Số được chọn sẽ được đánh dấu."
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/sort-sequence/guide/page.tsx",
                                                                            lineNumber: 65,
                                                                            columnNumber: 23
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/sort-sequence/guide/page.tsx",
                                                                    lineNumber: 63,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/sort-sequence/guide/page.tsx",
                                                            lineNumber: 59,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex gap-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500/50 to-indigo-500/50 flex items-center justify-center font-black text-white text-base shadow-lg",
                                                                    children: "3"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/sort-sequence/guide/page.tsx",
                                                                    lineNumber: 71,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex-1",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                            className: "font-black text-indigo-100 mb-1.5 text-base",
                                                                            children: "Đặt số vào vị trí"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/sort-sequence/guide/page.tsx",
                                                                            lineNumber: 75,
                                                                            columnNumber: 23
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-indigo-200/90 text-sm leading-relaxed",
                                                                            children: "Sau khi chọn số, click vào một vị trí trống trong dãy số ở phần dưới để đặt số đó vào."
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/sort-sequence/guide/page.tsx",
                                                                            lineNumber: 76,
                                                                            columnNumber: 23
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/sort-sequence/guide/page.tsx",
                                                                    lineNumber: 74,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/sort-sequence/guide/page.tsx",
                                                            lineNumber: 70,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex gap-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500/50 to-indigo-500/50 flex items-center justify-center font-black text-white text-base shadow-lg",
                                                                    children: "4"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/sort-sequence/guide/page.tsx",
                                                                    lineNumber: 82,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex-1",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                            className: "font-black text-indigo-100 mb-1.5 text-base",
                                                                            children: "Hoàn thành dãy số"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/sort-sequence/guide/page.tsx",
                                                                            lineNumber: 86,
                                                                            columnNumber: 23
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-indigo-200/90 text-sm leading-relaxed",
                                                                            children: "Lặp lại quá trình cho đến khi tất cả các số được sắp xếp đúng theo quy luật tăng dần."
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/sort-sequence/guide/page.tsx",
                                                                            lineNumber: 87,
                                                                            columnNumber: 23
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/sort-sequence/guide/page.tsx",
                                                                    lineNumber: 85,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/sort-sequence/guide/page.tsx",
                                                            lineNumber: 81,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/sort-sequence/guide/page.tsx",
                                                    lineNumber: 47,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/sort-sequence/guide/page.tsx",
                                            lineNumber: 43,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                            className: "space-y-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                    className: "text-xl sm:text-2xl font-black text-indigo-300 flex items-center gap-2 drop-shadow-lg",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-xl",
                                                            children: "💡"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/sort-sequence/guide/page.tsx",
                                                            lineNumber: 97,
                                                            columnNumber: 19
                                                        }, this),
                                                        " Ví Dụ"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/sort-sequence/guide/page.tsx",
                                                    lineNumber: 96,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "glass p-4 sm:p-5 rounded-xl border-2 border-indigo-500/40 bg-gradient-to-br from-indigo-950/20 to-indigo-950/20",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "space-y-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "p-3 rounded-lg bg-gradient-to-r from-indigo-900/30 to-indigo-900/30 border border-indigo-500/20",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-indigo-200/90 mb-1.5 text-sm",
                                                                        children: [
                                                                            "Các số cần sắp xếp: ",
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "font-black text-indigo-300 text-base",
                                                                                children: "7, 3, 9, 1, 5"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/sort-sequence/guide/page.tsx",
                                                                                lineNumber: 102,
                                                                                columnNumber: 92
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/sort-sequence/guide/page.tsx",
                                                                        lineNumber: 102,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-indigo-200/90 mb-1.5 text-sm",
                                                                        children: "Quy luật: Sắp xếp theo thứ tự tăng dần"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/sort-sequence/guide/page.tsx",
                                                                        lineNumber: 103,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-indigo-400 font-black text-base mt-1.5",
                                                                        children: [
                                                                            "→ Dãy số đúng: ",
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-lg",
                                                                                children: "1, 3, 5, 7, 9"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/sort-sequence/guide/page.tsx",
                                                                                lineNumber: 104,
                                                                                columnNumber: 97
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/sort-sequence/guide/page.tsx",
                                                                        lineNumber: 104,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/sort-sequence/guide/page.tsx",
                                                                lineNumber: 101,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "p-3 rounded-lg bg-gradient-to-r from-indigo-900/30 to-indigo-900/30 border border-indigo-500/20",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-indigo-200/90 mb-1.5 text-sm",
                                                                        children: [
                                                                            "Các số cần sắp xếp: ",
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "font-black text-indigo-300 text-base",
                                                                                children: "12, 8, 15, 3, 20"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/sort-sequence/guide/page.tsx",
                                                                                lineNumber: 107,
                                                                                columnNumber: 92
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/sort-sequence/guide/page.tsx",
                                                                        lineNumber: 107,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-indigo-200/90 mb-1.5 text-sm",
                                                                        children: "Quy luật: Sắp xếp theo thứ tự tăng dần"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/sort-sequence/guide/page.tsx",
                                                                        lineNumber: 108,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-indigo-400 font-black text-base mt-1.5",
                                                                        children: [
                                                                            "→ Dãy số đúng: ",
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-lg",
                                                                                children: "3, 8, 12, 15, 20"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/sort-sequence/guide/page.tsx",
                                                                                lineNumber: 109,
                                                                                columnNumber: 97
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/sort-sequence/guide/page.tsx",
                                                                        lineNumber: 109,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/sort-sequence/guide/page.tsx",
                                                                lineNumber: 106,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/sort-sequence/guide/page.tsx",
                                                        lineNumber: 100,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/sort-sequence/guide/page.tsx",
                                                    lineNumber: 99,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/sort-sequence/guide/page.tsx",
                                            lineNumber: 95,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                            className: "space-y-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                    className: "text-xl sm:text-2xl font-black text-indigo-300 flex items-center gap-2 drop-shadow-lg",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-xl",
                                                            children: "🎯"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/sort-sequence/guide/page.tsx",
                                                            lineNumber: 117,
                                                            columnNumber: 19
                                                        }, this),
                                                        " Mẹo Chơi"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/sort-sequence/guide/page.tsx",
                                                    lineNumber: 116,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "glass p-4 sm:p-5 rounded-xl border-2 border-indigo-500/40 bg-gradient-to-br from-indigo-950/20 to-indigo-950/20",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                        className: "space-y-2.5 text-indigo-200/90",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                className: "flex items-start gap-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-indigo-400 text-base font-black mt-0.5",
                                                                        children: "•"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/sort-sequence/guide/page.tsx",
                                                                        lineNumber: 122,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-sm leading-relaxed",
                                                                        children: "Tìm số nhỏ nhất trước và đặt nó vào vị trí đầu tiên"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/sort-sequence/guide/page.tsx",
                                                                        lineNumber: 123,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/sort-sequence/guide/page.tsx",
                                                                lineNumber: 121,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                className: "flex items-start gap-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-indigo-400 text-base font-black mt-0.5",
                                                                        children: "•"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/sort-sequence/guide/page.tsx",
                                                                        lineNumber: 126,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-sm leading-relaxed",
                                                                        children: "Sau đó tìm số nhỏ nhất tiếp theo và đặt vào vị trí tiếp theo"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/sort-sequence/guide/page.tsx",
                                                                        lineNumber: 127,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/sort-sequence/guide/page.tsx",
                                                                lineNumber: 125,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                className: "flex items-start gap-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-indigo-400 text-base font-black mt-0.5",
                                                                        children: "•"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/sort-sequence/guide/page.tsx",
                                                                        lineNumber: 130,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-sm leading-relaxed",
                                                                        children: "Lặp lại quá trình cho đến khi hoàn thành"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/sort-sequence/guide/page.tsx",
                                                                        lineNumber: 131,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/sort-sequence/guide/page.tsx",
                                                                lineNumber: 129,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                className: "flex items-start gap-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-indigo-400 text-base font-black mt-0.5",
                                                                        children: "•"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/sort-sequence/guide/page.tsx",
                                                                        lineNumber: 134,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-sm leading-relaxed",
                                                                        children: "Kiểm tra lại dãy số sau khi hoàn thành để đảm bảo đúng"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/sort-sequence/guide/page.tsx",
                                                                        lineNumber: 135,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/sort-sequence/guide/page.tsx",
                                                                lineNumber: 133,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/sort-sequence/guide/page.tsx",
                                                        lineNumber: 120,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/sort-sequence/guide/page.tsx",
                                                    lineNumber: 119,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/sort-sequence/guide/page.tsx",
                                            lineNumber: 115,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-center pt-5",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/sort-sequence",
                                                className: "btn-modern flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 via-indigo-600 to-indigo-600 hover:from-indigo-500 hover:via-indigo-500 hover:to-indigo-500 text-white font-black rounded-lg text-base shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-indigo-500/60",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"], {
                                                        size: 20
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/sort-sequence/guide/page.tsx",
                                                        lineNumber: 146,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "Bắt Đầu Chơi"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/sort-sequence/guide/page.tsx",
                                                        lineNumber: 147,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/sort-sequence/guide/page.tsx",
                                                lineNumber: 142,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/sort-sequence/guide/page.tsx",
                                            lineNumber: 141,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/sort-sequence/guide/page.tsx",
                                    lineNumber: 32,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/sort-sequence/guide/page.tsx",
                            lineNumber: 21,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/sort-sequence/guide/page.tsx",
                        lineNumber: 20,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/sort-sequence/guide/page.tsx",
                lineNumber: 14,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}),
];

//# sourceMappingURL=_324e187a._.js.map