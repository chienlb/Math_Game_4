module.exports = [
"[project]/hooks/use-mouse-position.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useMousePosition",
    ()=>useMousePosition
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
function useMousePosition(containerRef) {
    const mouseRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])({
        x: 0,
        y: 0
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleMouseMove = (e)=>{
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            mouseRef.current.x = (e.clientX - rect.left) / rect.width * 2 - 1;
            mouseRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        };
        window.addEventListener("mousemove", handleMouseMove);
        return ()=>{
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [
        containerRef
    ]);
    return mouseRef;
}
}),
"[project]/lib/constants.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Game constants and configuration
 */ __turbopack_context__.s([
    "GAME_CONFIG",
    ()=>GAME_CONFIG,
    "GAME_TYPES",
    ()=>GAME_TYPES,
    "UI_TEXT",
    ()=>UI_TEXT
]);
const GAME_CONFIG = {
    THREE: {
        FOV: 75,
        NEAR: 0.1,
        FAR: 1000,
        BACKGROUND_COLOR: 0x0f172a,
        FOG_NEAR: 80,
        FOG_FAR: 200
    },
    ANIMATION: {
        ROTATION_SPEED: 0.005,
        FLOAT_AMPLITUDE: 0.8,
        PULSE_SPEED: 2,
        MOUSE_INFLUENCE: 0.01
    },
    COLORS: {
        LIGHT_CYAN: 0x00f3ff,
        LIGHT_PINK: 0xff006e,
        LIGHT_GREEN: 0x00ff88,
        AMBIENT: 0xffffff
    }
};
const UI_TEXT = {
    COMMON: {
        BACK: "Quay Lại",
        RESTART: "Làm Lại",
        SCORE: "Điểm",
        NEXT_QUESTION: "Câu Tiếp Theo →",
        PLAY_AGAIN: "Chơi Lại"
    },
    NEXT_NUMBER: {
        TITLE: "Tìm số tiếp theo trong dãy:",
        SELECT_ANSWER: "Chọn đáp án:",
        CORRECT: "Chính xác!",
        CORRECT_DESC: "Bạn tìm đúng quy luật rồi!",
        INCORRECT: "Chưa đúng",
        CORRECT_ANSWER: "Đáp án đúng là:",
        COMPLETE: "Bạn hoàn thành trò chơi với",
        POINTS: "điểm!"
    },
    MISSING_NUMBER: {
        TITLE: "Tìm số còn thiếu trong dãy:",
        SELECT_ANSWER: "Chọn đáp án:",
        CORRECT: "Siêu Đúng!",
        CORRECT_DESC: "Bạn tìm thấy số còn thiếu rồi!",
        INCORRECT: "Chưa chính xác",
        CORRECT_ANSWER: "Số đúng là:",
        COMPLETE: "Bạn hoàn thành trò chơi với",
        POINTS: "điểm!"
    },
    SORT_SEQUENCE: {
        TITLE: "Sắp xếp các số theo quy luật tăng dần",
        INSTRUCTIONS: "Nhấp các số để sắp xếp theo thứ tự tăng dần",
        SELECT_NUMBERS: "Các số để chọn:",
        SORTED_SEQUENCE: "Dãy số đã sắp xếp:",
        SELECT_NUMBERS_PLACEHOLDER: "Chọn các số ở trên...",
        CORRECT: "Tuyệt Vời!",
        CORRECT_DESC: "Bạn đã sắp xếp đúng thứ tự!",
        INCORRECT: "Chưa đúng",
        CORRECT_ANSWER: "Thứ tự đúng là:",
        COMPLETE: "Bạn hoàn thành trò chơi với",
        POINTS: "điểm!"
    }
};
const GAME_TYPES = {
    NEXT: "next",
    MISSING: "missing",
    SORT: "sort",
    MENU: "menu"
};
}),
"[project]/lib/three-helpers.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createBoxMesh",
    ()=>createBoxMesh,
    "createEnhancedLights",
    ()=>createEnhancedLights,
    "createGameLights",
    ()=>createGameLights,
    "createGlowingSphere",
    ()=>createGlowingSphere,
    "createParticleSystem",
    ()=>createParticleSystem,
    "createSphereMesh",
    ()=>createSphereMesh,
    "createTrail",
    ()=>createTrail
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/constants.ts [app-ssr] (ecmascript)");
;
;
function createGameLights(scene, options) {
    const intensity = options?.intensity ?? 2;
    const distance = options?.distance ?? 150;
    const lights = [];
    // Colored point lights
    const light1 = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PointLight"](__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GAME_CONFIG"].COLORS.LIGHT_CYAN, intensity, distance);
    light1.position.set(20, 20, 20);
    light1.castShadow = true;
    scene.add(light1);
    lights.push(light1);
    const light2 = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PointLight"](__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GAME_CONFIG"].COLORS.LIGHT_PINK, intensity, distance);
    light2.position.set(-20, -20, 20);
    light2.castShadow = true;
    scene.add(light2);
    lights.push(light2);
    const light3 = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PointLight"](__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GAME_CONFIG"].COLORS.LIGHT_GREEN, intensity * 0.75, distance * 0.67);
    light3.position.set(0, 25, 0);
    scene.add(light3);
    lights.push(light3);
    // Ambient light
    const ambientLight = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AmbientLight"](__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GAME_CONFIG"].COLORS.AMBIENT, 0.4);
    scene.add(ambientLight);
    lights.push(ambientLight);
    return lights;
}
function createSphereMesh(radius, color, options) {
    const segments = options?.segments ?? 64;
    const geometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SphereGeometry"](radius, segments, segments);
    const material = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
        color: typeof color === "number" ? color : color.getHex(),
        metalness: options?.metalness ?? 0.5,
        roughness: options?.roughness ?? 0.3,
        emissiveIntensity: options?.emissiveIntensity ?? 0.7,
        envMapIntensity: 1.2
    });
    if (color instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Color"]) {
        material.emissive = color.clone().multiplyScalar(0.7);
    }
    const mesh = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"](geometry, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
}
function createBoxMesh(size, color, options) {
    const geometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BoxGeometry"](size, size, size);
    const material = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
        color: typeof color === "number" ? color : color.getHex(),
        metalness: options?.metalness ?? 0.6,
        roughness: options?.roughness ?? 0.3,
        emissiveIntensity: options?.emissiveIntensity ?? 0.6,
        envMapIntensity: 1.3
    });
    if (color instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Color"]) {
        material.emissive = color instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Color"] ? color.clone().multiplyScalar(0.5) : new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Color"](0x000000);
    }
    const mesh = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"](geometry, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
}
function createGlowingSphere(radius, color, options) {
    const group = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Group"]();
    const segments = options?.segments ?? 64;
    const glowLayers = options?.glowLayers ?? 3;
    const glowIntensity = options?.glowIntensity ?? 0.8;
    const colorHex = typeof color === "number" ? color : color.getHex();
    const colorObj = typeof color === "number" ? new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Color"](color) : color;
    // Main sphere with enhanced materials
    const mainGeometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SphereGeometry"](radius, segments, segments);
    const mainMaterial = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
        color: colorHex,
        metalness: 0.9,
        roughness: 0.05,
        emissive: colorHex,
        emissiveIntensity: glowIntensity * 1.2,
        envMapIntensity: 1.5
    });
    const mainSphere = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"](mainGeometry, mainMaterial);
    mainSphere.castShadow = true;
    mainSphere.receiveShadow = true;
    group.add(mainSphere);
    // Glow layers
    for(let i = 0; i < glowLayers; i++){
        const glowRadius = radius * (1.1 + i * 0.15);
        const glowGeometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SphereGeometry"](glowRadius, 32, 32);
        const glowMaterial = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
            color: colorHex,
            transparent: true,
            opacity: (0.3 - i * 0.08) * glowIntensity,
            side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BackSide"]
        });
        const glowMesh = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"](glowGeometry, glowMaterial);
        group.add(glowMesh);
    }
    return group;
}
function createParticleSystem(count, color, options) {
    const size = options?.size ?? 0.1;
    const spread = options?.spread ?? 50;
    const speed = options?.speed ?? 0.5;
    const geometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BufferGeometry"]();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const velocities = new Float32Array(count * 3);
    const colorHex = typeof color === "number" ? color : color.getHex();
    const colorObj = typeof color === "number" ? new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Color"](color) : color;
    for(let i = 0; i < count; i++){
        const i3 = i * 3;
        positions[i3] = (Math.random() - 0.5) * spread;
        positions[i3 + 1] = (Math.random() - 0.5) * spread;
        positions[i3 + 2] = (Math.random() - 0.5) * spread;
        const hue = Math.random();
        const particleColor = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Color"]().setHSL(hue, 0.9, 0.6);
        colors[i3] = particleColor.r;
        colors[i3 + 1] = particleColor.g;
        colors[i3 + 2] = particleColor.b;
        sizes[i] = Math.random() * size + size * 0.5;
        velocities[i3] = (Math.random() - 0.5) * speed;
        velocities[i3 + 1] = (Math.random() - 0.5) * speed;
        velocities[i3 + 2] = (Math.random() - 0.5) * speed;
    }
    geometry.setAttribute("position", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BufferAttribute"](positions, 3));
    geometry.setAttribute("color", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BufferAttribute"](colors, 3));
    geometry.setAttribute("size", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BufferAttribute"](sizes, 1));
    const material = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PointsMaterial"]({
        size: size * 10,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdditiveBlending"],
        depthWrite: false
    });
    const particles = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Points"](geometry, material);
    const update = (time)=>{
        const positions = geometry.attributes.position.array;
        const colors = geometry.attributes.color.array;
        for(let i = 0; i < count; i++){
            const i3 = i * 3;
            // Update position
            positions[i3] += velocities[i3] * 0.01;
            positions[i3 + 1] += velocities[i3 + 1] * 0.01;
            positions[i3 + 2] += velocities[i3 + 2] * 0.01;
            // Bounce off boundaries
            if (Math.abs(positions[i3]) > spread / 2) velocities[i3] *= -1;
            if (Math.abs(positions[i3 + 1]) > spread / 2) velocities[i3 + 1] *= -1;
            if (Math.abs(positions[i3 + 2]) > spread / 2) velocities[i3 + 2] *= -1;
            // Update color based on time
            const hue = (time * 0.1 + i * 0.01) % 1;
            const particleColor = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Color"]().setHSL(hue, 0.9, 0.6);
            colors[i3] = particleColor.r;
            colors[i3 + 1] = particleColor.g;
            colors[i3 + 2] = particleColor.b;
        }
        geometry.attributes.position.needsUpdate = true;
        geometry.attributes.color.needsUpdate = true;
    };
    return {
        particles,
        update
    };
}
function createTrail(points, color, options) {
    const geometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BufferGeometry"]().setFromPoints(points);
    const colorHex = typeof color === "number" ? color : color.getHex();
    const material = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LineBasicMaterial"]({
        color: colorHex,
        transparent: true,
        opacity: options?.opacity ?? 0.6,
        linewidth: options?.width ?? 2
    });
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Line"](geometry, material);
}
function createEnhancedLights(scene, options) {
    const intensity = options?.intensity ?? 2.5;
    const distance = options?.distance ?? 200;
    const lights = [];
    // Multiple colored point lights for richer lighting
    const colors = [
        {
            color: 0x00f3ff,
            pos: [
                25,
                25,
                25
            ]
        },
        {
            color: 0xff006e,
            pos: [
                -25,
                -25,
                25
            ]
        },
        {
            color: 0x00ff88,
            pos: [
                0,
                30,
                0
            ]
        },
        {
            color: 0xffaa00,
            pos: [
                -30,
                0,
                30
            ]
        },
        {
            color: 0xaa00ff,
            pos: [
                30,
                -20,
                20
            ]
        }
    ];
    colors.forEach(({ color, pos })=>{
        const light = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PointLight"](color, intensity * 0.8, distance);
        light.position.set(pos[0], pos[1], pos[2]);
        light.castShadow = true;
        scene.add(light);
        lights.push(light);
    });
    // Enhanced ambient light
    const ambientLight = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AmbientLight"](0xffffff, 0.5);
    scene.add(ambientLight);
    lights.push(ambientLight);
    // Hemisphere light for more natural lighting
    const hemisphereLight = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HemisphereLight"](0xffffff, 0x444444, 0.6);
    scene.add(hemisphereLight);
    lights.push(hemisphereLight);
    return lights;
}
}),
"[project]/components/games/next-number-game.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>NextNumberGame
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-ssr] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/rotate-ccw.js [app-ssr] (ecmascript) <export default as RotateCcw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/book-open.js [app-ssr] (ecmascript) <export default as BookOpen>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.module.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$mouse$2d$position$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/use-mouse-position.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2d$helpers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/three-helpers.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/constants.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
const generateQuestions = ()=>{
    return [
        {
            sequence: [
                2,
                4,
                6,
                8
            ],
            options: [
                9,
                10,
                11,
                12
            ],
            correct: 10
        },
        {
            sequence: [
                3,
                6,
                9,
                12
            ],
            options: [
                14,
                15,
                16,
                17
            ],
            correct: 15
        },
        {
            sequence: [
                1,
                1,
                2,
                3,
                5
            ],
            options: [
                7,
                8,
                9,
                10
            ],
            correct: 8
        },
        {
            sequence: [
                1,
                2,
                4,
                8
            ],
            options: [
                15,
                16,
                17,
                18
            ],
            correct: 16
        },
        {
            sequence: [
                1,
                4,
                9,
                16
            ],
            options: [
                24,
                25,
                26,
                27
            ],
            correct: 25
        }
    ];
};
function NextNumberGame({ onBack, guidePath = "/next-number/guide" }) {
    const [questions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(generateQuestions());
    const [currentQuestion, setCurrentQuestion] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [score, setScore] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [answered, setAnswered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selectedAnswer, setSelectedAnswer] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [draggedNumber, setDraggedNumber] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [dragOverIndex, setDragOverIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const mouseRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$mouse$2d$position$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMousePosition"])(canvasRef);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!canvasRef.current) return;
        const container = canvasRef.current;
        const scene = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Scene"]();
        scene.fog = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fog"](__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GAME_CONFIG"].THREE.BACKGROUND_COLOR, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GAME_CONFIG"].THREE.FOG_NEAR, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GAME_CONFIG"].THREE.FOG_FAR);
        const camera = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PerspectiveCamera"](__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GAME_CONFIG"].THREE.FOV, container.clientWidth / container.clientHeight, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GAME_CONFIG"].THREE.NEAR, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GAME_CONFIG"].THREE.FAR);
        camera.position.z = 30;
        const renderer = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["WebGLRenderer"]({
            antialias: true,
            alpha: true
        });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setClearColor(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GAME_CONFIG"].THREE.BACKGROUND_COLOR, 0);
        renderer.outputColorSpace = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SRGBColorSpace"];
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PCFSoftShadowMap"];
        renderer.shadowMap.autoUpdate = true;
        container.appendChild(renderer.domElement);
        const question = questions[currentQuestion];
        const groups = [];
        question.sequence.forEach((num, idx)=>{
            const group = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Group"]();
            const hue = 0.55 + idx / question.sequence.length * 0.15;
            const color = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Color"]().setHSL(hue, 0.95, 0.65);
            const glowingSphere = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2d$helpers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createGlowingSphere"])(1.2, color, {
                segments: 64,
                glowLayers: 5,
                glowIntensity: 1.0
            });
            group.add(glowingSphere);
            const torusRadius = 1.8;
            const torusThickness = 0.15;
            for(let i = 0; i < 4; i++){
                const torusGeom = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TorusGeometry"](torusRadius + i * 0.1, torusThickness - i * 0.02, 48, 120);
                const torusMat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
                    color: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Color"]().setHSL(hue, 0.98, 0.7 + i * 0.08),
                    emissive: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Color"]().setHSL(hue, 0.98, 0.5 + i * 0.05),
                    emissiveIntensity: 0.8,
                    metalness: 0.7,
                    roughness: 0.2,
                    transparent: true,
                    opacity: (0.75 - i * 0.1) * 0.98,
                    side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DoubleSide"]
                });
                const torus = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"](torusGeom, torusMat);
                group.add(torus);
                if (i === 0) {
                    group.userData.torusRing = torus;
                }
            }
            const particleCount = 16;
            for(let i = 0; i < particleCount; i++){
                const particleGeom = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SphereGeometry"](0.12, 20, 20);
                const particleMat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
                    color: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Color"]().setHSL(hue + i / particleCount * 0.2, 1, 0.75),
                    emissive: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Color"]().setHSL(hue + i / particleCount * 0.2, 1, 0.6),
                    emissiveIntensity: 1.2,
                    metalness: 0.8,
                    roughness: 0.1,
                    transparent: true,
                    opacity: 0.95
                });
                const particle = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"](particleGeom, particleMat);
                const angle = i / particleCount * Math.PI * 2;
                particle.userData = {
                    angle: angle,
                    distance: 2.8,
                    speed: 0.04,
                    index: i
                };
                group.add(particle);
            }
            const angle = idx / question.sequence.length * Math.PI * 2;
            group.position.x = Math.cos(angle) * 12;
            group.position.y = Math.sin(angle) * 12;
            group.userData = {
                targetX: group.position.x,
                targetY: group.position.y,
                number: num,
                index: idx,
                torusRing: group.userData.torusRing
            };
            scene.add(group);
            groups.push(group);
        });
        const { particles: bgParticles, update: updateParticles } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2d$helpers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createParticleSystem"])(200, 0x00d9ff, {
            size: 0.06,
            spread: 60,
            speed: 0.4
        });
        scene.add(bgParticles);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2d$helpers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createEnhancedLights"])(scene, {
            intensity: 3.5,
            distance: 200
        });
        const accentLight1 = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PointLight"](0x00d9ff, 3, 150);
        accentLight1.position.set(30, 30, 30);
        scene.add(accentLight1);
        const accentLight2 = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PointLight"](0x0066ff, 2.5, 150);
        accentLight2.position.set(-30, -30, 30);
        scene.add(accentLight2);
        // Create option spheres for 3D interaction with text labels
        const optionGroups = [];
        const optionSpheres = [];
        question.options.forEach((option, idx)=>{
            const optionGroup = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Group"]();
            const hue = 0.55 + idx / question.options.length * 0.15;
            const color = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Color"]().setHSL(hue, 0.98, 0.7);
            const optionSphere = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2d$helpers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createGlowingSphere"])(1.3, color, {
                segments: 64,
                glowLayers: 5,
                glowIntensity: 1.0
            });
            // Add text label using canvas texture
            const canvas = document.createElement("canvas");
            canvas.width = 256;
            canvas.height = 256;
            const ctx = canvas.getContext("2d");
            ctx.fillStyle = "#ffffff";
            ctx.font = "bold 120px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(option.toString(), 128, 128);
            ctx.strokeStyle = "#00d9ff";
            ctx.lineWidth = 8;
            ctx.strokeText(option.toString(), 128, 128);
            const texture = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CanvasTexture"](canvas);
            texture.needsUpdate = true;
            const labelGeometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PlaneGeometry"](1.5, 1.5);
            const labelMaterial = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
                map: texture,
                transparent: true,
                opacity: 0.95,
                side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DoubleSide"]
            });
            const label = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"](labelGeometry, labelMaterial);
            label.position.z = 1.5;
            label.lookAt(camera.position);
            const angle = idx / question.options.length * Math.PI * 2;
            optionGroup.position.x = Math.cos(angle) * 9;
            optionGroup.position.y = -7 + Math.sin(angle) * 2.5;
            optionGroup.position.z = -3;
            optionGroup.userData = {
                option: option,
                index: idx,
                targetY: optionGroup.position.y,
                targetZ: optionGroup.position.z,
                label: label,
                hovered: false
            };
            optionGroup.add(optionSphere);
            optionGroup.add(label);
            scene.add(optionGroup);
            optionGroups.push(optionGroup);
            optionSpheres.push(optionSphere.children[0]);
        });
        // Raycaster for 3D interaction with hover effects
        const raycaster = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Raycaster"]();
        const mouse = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector2"]();
        let hoveredOption = null;
        const handleMouseMove = (e)=>{
            const rect = container.getBoundingClientRect();
            mouse.x = (e.clientX - rect.left) / rect.width * 2 - 1;
            mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(optionGroups, true);
            if (intersects.length > 0 && !answered) {
                const clickedObject = intersects[0].object;
                const optionGroup = clickedObject.parent;
                if (optionGroup && optionGroup.userData.option !== undefined) {
                    if (hoveredOption !== optionGroup) {
                        if (hoveredOption) hoveredOption.userData.hovered = false;
                        hoveredOption = optionGroup;
                        optionGroup.userData.hovered = true;
                    }
                }
            } else {
                if (hoveredOption) {
                    hoveredOption.userData.hovered = false;
                    hoveredOption = null;
                }
            }
        };
        const handleClick = (e)=>{
            if (answered) return;
            const rect = container.getBoundingClientRect();
            mouse.x = (e.clientX - rect.left) / rect.width * 2 - 1;
            mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(optionGroups, true);
            if (intersects.length > 0) {
                const clickedObject = intersects[0].object;
                const optionGroup = clickedObject.parent;
                if (optionGroup && optionGroup.userData.option !== undefined) {
                    handleAnswer(optionGroup.userData.option);
                }
            }
        };
        container.addEventListener("mousemove", handleMouseMove);
        container.addEventListener("click", handleClick);
        let animationId;
        const animate = ()=>{
            animationId = requestAnimationFrame(animate);
            const time = Date.now() * 0.001;
            updateParticles(time);
            groups.forEach((group)=>{
                if (group.userData.number !== undefined) {
                    group.rotation.x += __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GAME_CONFIG"].ANIMATION.ROTATION_SPEED * 1.8;
                    group.rotation.y += __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GAME_CONFIG"].ANIMATION.ROTATION_SPEED * 2.2;
                    group.rotation.z += __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GAME_CONFIG"].ANIMATION.ROTATION_SPEED * 0.6;
                    const floatY = Math.sin(time + group.userData.index) * __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GAME_CONFIG"].ANIMATION.FLOAT_AMPLITUDE * 1.2;
                    const floatZ = Math.sin(time * 0.5 + group.userData.index) * 5;
                    group.position.y = group.userData.targetY + floatY;
                    group.position.z = floatZ;
                    const mouseInfluence = (mouseRef.current.x * 6 - group.position.x * 0.03) * __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GAME_CONFIG"].ANIMATION.MOUSE_INFLUENCE;
                    group.position.x += mouseInfluence;
                    if (group.userData.torusRing) {
                        const pulsing = Math.sin(time * __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GAME_CONFIG"].ANIMATION.PULSE_SPEED * 1.2 + group.userData.index) * 0.5 + 0.5;
                        group.userData.torusRing.scale.set(1 + pulsing * 0.5, 1 + pulsing * 0.5, 1 + pulsing * 0.5);
                        group.userData.torusRing.material.opacity = pulsing * 0.95 + 0.05;
                        group.userData.torusRing.rotation.z += 0.015;
                    }
                    group.children.forEach((child)=>{
                        if (child instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"] && child.userData.angle !== undefined) {
                            child.userData.angle += child.userData.speed;
                            const angle = child.userData.angle;
                            const distance = child.userData.distance;
                            child.position.x = Math.cos(angle) * distance;
                            child.position.y = Math.sin(angle * 0.7) * distance;
                            child.position.z = Math.sin(angle * 1.3) * distance * 0.6;
                            child.rotation.x += 0.06;
                            child.rotation.y += 0.06;
                            const particlePulse = Math.sin(time * 3.5 + child.userData.index) * 0.3 + 0.7;
                            child.scale.set(particlePulse, particlePulse, particlePulse);
                            const colorPulse = Math.sin(time * 2.5 + child.userData.index) * 0.5 + 0.5;
                            child.material.opacity = colorPulse * 0.95 + 0.05;
                        }
                    });
                    const spherePulse = Math.sin(time * 1.8 + group.userData.index) * 0.12 + 1;
                    group.scale.set(spherePulse, spherePulse, spherePulse);
                }
            });
            // Animate option spheres with enhanced effects
            optionGroups.forEach((optionGroup)=>{
                optionGroup.rotation.x += 0.012;
                optionGroup.rotation.y += 0.018;
                optionGroup.rotation.z += 0.005;
                const floatY = Math.sin(time * 1.5 + optionGroup.userData.index) * 1.2;
                optionGroup.position.y = optionGroup.userData.targetY + floatY;
                const floatZ = Math.sin(time * 0.8 + optionGroup.userData.index) * 1.5;
                optionGroup.position.z = optionGroup.userData.targetZ + floatZ;
                let pulse = Math.sin(time * 2 + optionGroup.userData.index) * 0.15 + 1;
                // Hover effect
                if (optionGroup.userData.hovered && !answered) {
                    pulse = Math.sin(time * 4) * 0.2 + 1.3;
                    optionGroup.position.z = optionGroup.userData.targetZ + 2;
                }
                // Selected effect
                if (selectedAnswer === optionGroup.userData.option) {
                    pulse = Math.sin(time * 3) * 0.25 + 1.4;
                    optionGroup.position.z = optionGroup.userData.targetZ + 3;
                }
                optionGroup.scale.set(pulse, pulse, pulse);
                // Update label to always face camera
                if (optionGroup.userData.label) {
                    optionGroup.userData.label.lookAt(camera.position);
                }
            });
            renderer.render(scene, camera);
        };
        animate();
        const handleResize = ()=>{
            if (container) {
                camera.aspect = container.clientWidth / container.clientHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(container.clientWidth, container.clientHeight);
            }
        };
        window.addEventListener("resize", handleResize);
        return ()=>{
            window.removeEventListener("resize", handleResize);
            container.removeEventListener("mousemove", handleMouseMove);
            container.removeEventListener("click", handleClick);
            cancelAnimationFrame(animationId);
            optionGroups.forEach((group)=>{
                group.traverse((object)=>{
                    if (object instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"]) {
                        object.geometry.dispose();
                        if (Array.isArray(object.material)) {
                            object.material.forEach((material)=>material.dispose());
                        } else {
                            object.material.dispose();
                        }
                    }
                });
                scene.remove(group);
            });
            groups.forEach((group)=>{
                group.traverse((object)=>{
                    if (object instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"]) {
                        object.geometry.dispose();
                        if (Array.isArray(object.material)) {
                            object.material.forEach((material)=>material.dispose());
                        } else {
                            object.material.dispose();
                        }
                    }
                });
                scene.remove(group);
            });
            bgParticles.geometry.dispose();
            if (Array.isArray(bgParticles.material)) {
                bgParticles.material.forEach((material)=>material.dispose());
            } else {
                bgParticles.material.dispose();
            }
            scene.remove(bgParticles);
            renderer.dispose();
            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
        };
    }, [
        currentQuestion,
        questions,
        mouseRef
    ]);
    const handleDragStart = (option)=>{
        if (answered) return;
        setDraggedNumber(option);
    };
    const handleDragEnd = ()=>{
        if (draggedNumber !== null && dragOverIndex === question.sequence.length) {
            handleAnswer(draggedNumber);
        }
        setDraggedNumber(null);
        setDragOverIndex(null);
    };
    const handleDragOver = (e, index)=>{
        e.preventDefault();
        if (!answered && draggedNumber !== null) {
            setDragOverIndex(index);
        }
    };
    const handleAnswer = (option)=>{
        if (answered) return;
        setSelectedAnswer(option);
        setAnswered(true);
        if (option === questions[currentQuestion].correct) {
            setScore((prev)=>prev + 1);
        }
    };
    const handleNext = ()=>{
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion((prev)=>prev + 1);
            setAnswered(false);
            setSelectedAnswer(null);
            setDraggedNumber(null);
            setDragOverIndex(null);
        }
    };
    const handleRestart = ()=>{
        setCurrentQuestion(0);
        setScore(0);
        setAnswered(false);
        setSelectedAnswer(null);
        setDraggedNumber(null);
        setDragOverIndex(null);
    };
    const isGameComplete = currentQuestion === questions.length - 1 && answered;
    const question = questions[currentQuestion];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative w-full h-full flex flex-col",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: canvasRef,
                className: "absolute inset-0 -z-10"
            }, void 0, false, {
                fileName: "[project]/components/games/next-number-game.tsx",
                lineNumber: 510,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "absolute top-3 sm:top-4 left-3 sm:left-4 flex gap-2 sm:gap-3 z-30",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onBack,
                        className: "btn-modern flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl text-sm sm:text-base font-semibold shadow-lg",
                        "aria-label": __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UI_TEXT"].COMMON.BACK,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                size: 16,
                                className: "sm:w-[18px] sm:h-[18px]"
                            }, void 0, false, {
                                fileName: "[project]/components/games/next-number-game.tsx",
                                lineNumber: 518,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "hidden sm:inline",
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UI_TEXT"].COMMON.BACK
                            }, void 0, false, {
                                fileName: "[project]/components/games/next-number-game.tsx",
                                lineNumber: 519,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/games/next-number-game.tsx",
                        lineNumber: 513,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: guidePath,
                        className: "btn-modern flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-white rounded-xl text-sm sm:text-base font-semibold shadow-lg",
                        "aria-label": "Quay về trang hướng dẫn",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"], {
                                size: 16,
                                className: "sm:w-[18px] sm:h-[18px]"
                            }, void 0, false, {
                                fileName: "[project]/components/games/next-number-game.tsx",
                                lineNumber: 526,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "hidden sm:inline",
                                children: "Hướng Dẫn"
                            }, void 0, false, {
                                fileName: "[project]/components/games/next-number-game.tsx",
                                lineNumber: 527,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/games/next-number-game.tsx",
                        lineNumber: 521,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleRestart,
                        className: "btn-modern flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-xl text-sm sm:text-base font-semibold shadow-lg",
                        "aria-label": __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UI_TEXT"].COMMON.RESTART,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__["RotateCcw"], {
                                size: 16,
                                className: "sm:w-[18px] sm:h-[18px]"
                            }, void 0, false, {
                                fileName: "[project]/components/games/next-number-game.tsx",
                                lineNumber: 534,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "hidden sm:inline",
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UI_TEXT"].COMMON.RESTART
                            }, void 0, false, {
                                fileName: "[project]/components/games/next-number-game.tsx",
                                lineNumber: 535,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/games/next-number-game.tsx",
                        lineNumber: 529,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/games/next-number-game.tsx",
                lineNumber: 512,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-4 right-4 z-30",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "glass-strong px-3 sm:px-4 py-2 rounded-xl border border-cyan-400/40 shadow-lg bg-gradient-to-r from-blue-900/30 to-cyan-900/30",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-lg sm:text-xl font-black text-cyan-300 flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "⭐"
                            }, void 0, false, {
                                fileName: "[project]/components/games/next-number-game.tsx",
                                lineNumber: 542,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UI_TEXT"].COMMON.SCORE,
                                    ": ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-cyan-200",
                                        children: score
                                    }, void 0, false, {
                                        fileName: "[project]/components/games/next-number-game.tsx",
                                        lineNumber: 544,
                                        columnNumber: 39
                                    }, this),
                                    "/",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-cyan-400",
                                        children: questions.length
                                    }, void 0, false, {
                                        fileName: "[project]/components/games/next-number-game.tsx",
                                        lineNumber: 545,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/games/next-number-game.tsx",
                                lineNumber: 543,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/games/next-number-game.tsx",
                        lineNumber: 541,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/games/next-number-game.tsx",
                    lineNumber: 540,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/games/next-number-game.tsx",
                lineNumber: 539,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "absolute inset-0 flex items-center justify-center px-4 py-20 z-20 overflow-y-auto",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "glass-strong p-6 sm:p-8 rounded-3xl max-w-5xl w-full border-2 border-cyan-400/60 shadow-2xl relative overflow-hidden bg-gradient-to-br from-blue-950/30 via-cyan-950/25 to-blue-950/30 my-8 backdrop-blur-xl",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            className: "mb-8 relative z-10",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3 mb-5",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-cyan-200 font-bold px-4 py-2 bg-cyan-500/30 rounded-full border border-cyan-400/50",
                                        children: [
                                            "Câu ",
                                            currentQuestion + 1,
                                            "/",
                                            questions.length
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/games/next-number-game.tsx",
                                        lineNumber: 556,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/games/next-number-game.tsx",
                                    lineNumber: 555,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-300 to-cyan-300 mb-6 sm:mb-8",
                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UI_TEXT"].NEXT_NUMBER.TITLE
                                }, void 0, false, {
                                    fileName: "[project]/components/games/next-number-game.tsx",
                                    lineNumber: 560,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm sm:text-base text-cyan-100 mb-4 sm:mb-6 font-medium text-center",
                                    children: [
                                        "Kéo số từ bên dưới vào vị trí ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-cyan-300 font-bold",
                                            children: "?"
                                        }, void 0, false, {
                                            fileName: "[project]/components/games/next-number-game.tsx",
                                            lineNumber: 564,
                                            columnNumber: 45
                                        }, this),
                                        " để hoàn thành dãy số"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/games/next-number-game.tsx",
                                    lineNumber: 563,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-3 sm:gap-4 justify-center items-center mb-6 sm:mb-8 flex-wrap",
                                    children: [
                                        question.sequence.map((num, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "number-badge w-14 h-14 sm:w-16 sm:h-16 text-xl sm:text-2xl bg-gradient-to-br from-cyan-500 via-blue-500 to-cyan-600 shadow-lg border-cyan-400/50",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: num
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/games/next-number-game.tsx",
                                                        lineNumber: 573,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/games/next-number-game.tsx",
                                                    lineNumber: 572,
                                                    columnNumber: 19
                                                }, this)
                                            }, `${num}-${idx}`, false, {
                                                fileName: "[project]/components/games/next-number-game.tsx",
                                                lineNumber: 569,
                                                columnNumber: 17
                                            }, this)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `text-4xl sm:text-5xl font-black transition-all duration-200 ${dragOverIndex === question.sequence.length ? "text-cyan-300 scale-110" : selectedAnswer !== null ? selectedAnswer === question.correct ? "text-green-400 scale-105" : "text-red-400 scale-105" : "text-cyan-400"}`,
                                            onDragOver: (e)=>handleDragOver(e, question.sequence.length),
                                            onDrop: handleDragEnd,
                                            children: selectedAnswer !== null ? selectedAnswer : "?"
                                        }, void 0, false, {
                                            fileName: "[project]/components/games/next-number-game.tsx",
                                            lineNumber: 577,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/games/next-number-game.tsx",
                                    lineNumber: 567,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/games/next-number-game.tsx",
                            lineNumber: 554,
                            columnNumber: 11
                        }, this),
                        !answered ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            className: "space-y-6 relative z-10",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center mb-6",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-base text-cyan-200 mb-3 font-semibold",
                                        children: "Kéo số vào vị trí trống"
                                    }, void 0, false, {
                                        fileName: "[project]/components/games/next-number-game.tsx",
                                        lineNumber: 598,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/games/next-number-game.tsx",
                                    lineNumber: 597,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4",
                                    children: question.options.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            draggable: !answered,
                                            onDragStart: ()=>handleDragStart(option),
                                            onDragEnd: handleDragEnd,
                                            className: `answer-btn py-4 sm:py-5 px-4 sm:px-6 text-lg sm:text-xl font-black relative overflow-hidden cursor-grab active:cursor-grabbing transition-all duration-200 ${draggedNumber === option ? "opacity-50 scale-95" : ""}`,
                                            style: {
                                                background: draggedNumber === option ? "linear-gradient(135deg, rgb(6, 182, 212), rgb(37, 99, 235))" : "linear-gradient(135deg, rgb(6, 182, 212), rgb(37, 99, 235), rgb(6, 182, 212))"
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "relative z-10",
                                                children: option
                                            }, void 0, false, {
                                                fileName: "[project]/components/games/next-number-game.tsx",
                                                lineNumber: 618,
                                                columnNumber: 21
                                            }, this)
                                        }, option, false, {
                                            fileName: "[project]/components/games/next-number-game.tsx",
                                            lineNumber: 604,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/components/games/next-number-game.tsx",
                                    lineNumber: 602,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/games/next-number-game.tsx",
                            lineNumber: 596,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            className: "text-center fade-in relative z-10",
                            children: [
                                selectedAnswer === question.correct ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mb-6 sm:mb-8",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-6xl sm:text-8xl mb-4 sm:mb-6",
                                            children: "🎉"
                                        }, void 0, false, {
                                            fileName: "[project]/components/games/next-number-game.tsx",
                                            lineNumber: 627,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-2xl sm:text-3xl font-black text-green-400 mb-2 sm:mb-3",
                                            children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UI_TEXT"].NEXT_NUMBER.CORRECT
                                        }, void 0, false, {
                                            fileName: "[project]/components/games/next-number-game.tsx",
                                            lineNumber: 628,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-base sm:text-lg text-cyan-100 font-medium",
                                            children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UI_TEXT"].NEXT_NUMBER.CORRECT_DESC
                                        }, void 0, false, {
                                            fileName: "[project]/components/games/next-number-game.tsx",
                                            lineNumber: 631,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/games/next-number-game.tsx",
                                    lineNumber: 626,
                                    columnNumber: 17
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mb-6 sm:mb-8",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-6xl sm:text-8xl mb-4 sm:mb-6",
                                            children: "😊"
                                        }, void 0, false, {
                                            fileName: "[project]/components/games/next-number-game.tsx",
                                            lineNumber: 635,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-2xl sm:text-3xl font-black text-orange-400 mb-2 sm:mb-3",
                                            children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UI_TEXT"].NEXT_NUMBER.INCORRECT
                                        }, void 0, false, {
                                            fileName: "[project]/components/games/next-number-game.tsx",
                                            lineNumber: 636,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-base sm:text-lg text-cyan-100 font-medium",
                                            children: [
                                                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UI_TEXT"].NEXT_NUMBER.CORRECT_ANSWER,
                                                " ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-black text-green-400 text-xl sm:text-2xl",
                                                    children: question.correct
                                                }, void 0, false, {
                                                    fileName: "[project]/components/games/next-number-game.tsx",
                                                    lineNumber: 641,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/games/next-number-game.tsx",
                                            lineNumber: 639,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/games/next-number-game.tsx",
                                    lineNumber: 634,
                                    columnNumber: 17
                                }, this),
                                !isGameComplete && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleNext,
                                    className: "btn-modern mt-6 sm:mt-8 px-8 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 hover:from-green-500 hover:via-emerald-500 hover:to-green-500 text-white font-black rounded-2xl text-base sm:text-lg shadow-xl",
                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UI_TEXT"].COMMON.NEXT_QUESTION
                                }, void 0, false, {
                                    fileName: "[project]/components/games/next-number-game.tsx",
                                    lineNumber: 647,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/games/next-number-game.tsx",
                            lineNumber: 624,
                            columnNumber: 13
                        }, this),
                        isGameComplete && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            className: "text-center mt-6 sm:mt-8 fade-in relative z-10",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mb-4 sm:mb-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-5xl sm:text-6xl mb-3 sm:mb-4",
                                            children: "🏆"
                                        }, void 0, false, {
                                            fileName: "[project]/components/games/next-number-game.tsx",
                                            lineNumber: 660,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xl sm:text-2xl text-cyan-100 mb-2 font-bold",
                                            children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UI_TEXT"].NEXT_NUMBER.COMPLETE
                                        }, void 0, false, {
                                            fileName: "[project]/components/games/next-number-game.tsx",
                                            lineNumber: 661,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-2xl sm:text-3xl text-cyan-300 font-black mb-3 sm:mb-4",
                                            children: [
                                                score,
                                                " ",
                                                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UI_TEXT"].NEXT_NUMBER.POINTS
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/games/next-number-game.tsx",
                                            lineNumber: 664,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/games/next-number-game.tsx",
                                    lineNumber: 659,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleRestart,
                                    className: "btn-modern px-8 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-cyan-600 via-blue-600 to-cyan-600 hover:from-cyan-500 hover:via-blue-500 hover:to-cyan-500 text-white font-black rounded-2xl text-base sm:text-lg shadow-xl",
                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UI_TEXT"].COMMON.PLAY_AGAIN
                                }, void 0, false, {
                                    fileName: "[project]/components/games/next-number-game.tsx",
                                    lineNumber: 668,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/games/next-number-game.tsx",
                            lineNumber: 658,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/games/next-number-game.tsx",
                    lineNumber: 552,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/games/next-number-game.tsx",
                lineNumber: 551,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/games/next-number-game.tsx",
        lineNumber: 509,
        columnNumber: 5
    }, this);
}
}),
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
"[project]/app/next-number/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>NextNumberPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$games$2f$next$2d$number$2d$game$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/games/next-number-game.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$solar$2d$system$2d$background$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/solar-system-background.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function NextNumberPage() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const handleBack = ()=>{
        router.push("/");
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$solar$2d$system$2d$background$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/app/next-number/page.tsx",
                lineNumber: 16,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative z-10 w-full h-screen overflow-hidden",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$games$2f$next$2d$number$2d$game$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    onBack: handleBack,
                    guidePath: "/next-number/guide"
                }, void 0, false, {
                    fileName: "[project]/app/next-number/page.tsx",
                    lineNumber: 18,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/next-number/page.tsx",
                lineNumber: 17,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}),
];

//# sourceMappingURL=_2a576bda._.js.map