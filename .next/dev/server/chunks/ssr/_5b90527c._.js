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
"[project]/lib/api-service.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * API Service for fetching game questions from endpoints
 */ __turbopack_context__.s([
    "fetchNumberSequenceQuestions",
    ()=>fetchNumberSequenceQuestions,
    "fetchOddOneOutQuestions",
    ()=>fetchOddOneOutQuestions,
    "fetchPatternGuesserQuestions",
    ()=>fetchPatternGuesserQuestions
]);
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';
async function fetchNumberSequenceQuestions() {
    try {
        const response = await fetch(`${API_BASE_URL}/number-sequence`);
        if (!response.ok) {
            throw new Error('Failed to fetch number sequence questions');
        }
        const data = await response.json();
        return data.questions || data;
    } catch (error) {
        console.error('Error fetching number sequence questions:', error);
        // Return fallback questions if API fails
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
            }
        ];
    }
}
async function fetchPatternGuesserQuestions() {
    try {
        const response = await fetch(`${API_BASE_URL}/pattern-guesser`);
        if (!response.ok) {
            throw new Error('Failed to fetch pattern guesser questions');
        }
        const data = await response.json();
        return data.questions || data;
    } catch (error) {
        console.error('Error fetching pattern guesser questions:', error);
        // Return fallback questions if API fails
        return [
            {
                sequence: [
                    2,
                    4,
                    null,
                    8
                ],
                options: [
                    5,
                    6,
                    7,
                    8
                ],
                correct: 6
            },
            {
                sequence: [
                    1,
                    null,
                    5,
                    7
                ],
                options: [
                    2,
                    3,
                    4,
                    5
                ],
                correct: 3
            },
            {
                sequence: [
                    10,
                    20,
                    null,
                    40
                ],
                options: [
                    25,
                    30,
                    35,
                    40
                ],
                correct: 30
            }
        ];
    }
}
async function fetchOddOneOutQuestions() {
    try {
        const response = await fetch(`${API_BASE_URL}/odd-one-out`);
        if (!response.ok) {
            throw new Error('Failed to fetch odd one out questions');
        }
        const data = await response.json();
        return data.questions || data;
    } catch (error) {
        console.error('Error fetching odd one out questions:', error);
        // Return fallback questions if API fails
        return [
            {
                numbers: [
                    8,
                    2,
                    6,
                    4
                ],
                correct: [
                    2,
                    4,
                    6,
                    8
                ],
                description: 'Sắp xếp theo thứ tự tăng dần'
            },
            {
                numbers: [
                    12,
                    3,
                    9,
                    6
                ],
                correct: [
                    3,
                    6,
                    9,
                    12
                ],
                description: 'Sắp xếp theo thứ tự tăng dần'
            },
            {
                numbers: [
                    3,
                    5,
                    1,
                    2
                ],
                correct: [
                    1,
                    2,
                    3,
                    5
                ],
                description: 'Sắp xếp theo thứ tự tăng dần'
            }
        ];
    }
}
}),
"[project]/components/games/missing-number-game.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MissingNumberGame
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
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api-service.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
function MissingNumberGame({ onBack, guidePath = "/missing-number/guide" }) {
    const [questions, setQuestions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [currentQuestion, setCurrentQuestion] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [score, setScore] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [answered, setAnswered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selectedAnswer, setSelectedAnswer] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showOptionPopup, setShowOptionPopup] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [clickedNullIndex, setClickedNullIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const mouseRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$mouse$2d$position$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMousePosition"])(canvasRef);
    const nullGroupsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])([]);
    // Fetch questions from API
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        async function loadQuestions() {
            setLoading(true);
            try {
                const fetchedQuestions = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2d$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchPatternGuesserQuestions"])();
                if (fetchedQuestions && fetchedQuestions.length > 0) {
                    setQuestions(fetchedQuestions);
                } else {
                    console.error('No questions received from API');
                    // Fallback questions are already returned by fetchPatternGuesserQuestions
                    setQuestions([
                        {
                            sequence: [
                                2,
                                4,
                                null,
                                8
                            ],
                            options: [
                                5,
                                6,
                                7,
                                8
                            ],
                            correct: 6
                        },
                        {
                            sequence: [
                                1,
                                null,
                                5,
                                7
                            ],
                            options: [
                                2,
                                3,
                                4,
                                5
                            ],
                            correct: 3
                        },
                        {
                            sequence: [
                                10,
                                20,
                                null,
                                40
                            ],
                            options: [
                                25,
                                30,
                                35,
                                40
                            ],
                            correct: 30
                        }
                    ]);
                }
            } catch (error) {
                console.error('Failed to load questions:', error);
                // Set fallback questions on error
                setQuestions([
                    {
                        sequence: [
                            2,
                            4,
                            null,
                            8
                        ],
                        options: [
                            5,
                            6,
                            7,
                            8
                        ],
                        correct: 6
                    },
                    {
                        sequence: [
                            1,
                            null,
                            5,
                            7
                        ],
                        options: [
                            2,
                            3,
                            4,
                            5
                        ],
                        correct: 3
                    },
                    {
                        sequence: [
                            10,
                            20,
                            null,
                            40
                        ],
                        options: [
                            25,
                            30,
                            35,
                            40
                        ],
                        correct: 30
                    }
                ]);
            } finally{
                setLoading(false);
            }
        }
        loadQuestions();
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (loading || questions.length === 0) return;
        if (!canvasRef.current) return;
        const question = questions[currentQuestion];
        if (!question || !question.sequence) return;
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
        container.appendChild(renderer.domElement);
        const groups = [];
        question.sequence.forEach((num, idx)=>{
            const group = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Group"]();
            const isNull = num === null;
            const hue = 0.05 + idx / Math.max(question.sequence.length, 1) * 0.1;
            const color = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Color"]().setHSL(hue, 0.9, 0.55);
            const cube = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2d$helpers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createBoxMesh"])(1.5, color, {
                metalness: isNull ? 0.9 : 0.6,
                roughness: isNull ? 0.05 : 0.3,
                emissiveIntensity: isNull ? 1.0 : 0.5
            });
            if (isNull && cube.material instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]) {
                cube.material.emissive = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Color"](0xff6b35).multiplyScalar(0.9);
            }
            group.add(cube);
            if (isNull) {
                for(let i = 0; i < 4; i++){
                    const edgeGeometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BoxGeometry"](1.5 + i * 0.12, 1.5 + i * 0.12, 1.5 + i * 0.12);
                    const edgeMaterial = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
                        color: 0xff6b35,
                        emissive: 0xff6b35,
                        emissiveIntensity: 0.8,
                        metalness: 0.7,
                        roughness: 0.2,
                        transparent: true,
                        opacity: 0.6 - i * 0.12,
                        wireframe: true
                    });
                    const edge = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"](edgeGeometry, edgeMaterial);
                    group.add(edge);
                }
                const glowGeometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BoxGeometry"](2.2, 2.2, 2.2);
                const glowMaterial = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
                    color: 0xff6b35,
                    emissive: 0xff6b35,
                    emissiveIntensity: 0.5,
                    metalness: 0.3,
                    roughness: 0.4,
                    transparent: true,
                    opacity: 0.25,
                    side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BackSide"]
                });
                const glow = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"](glowGeometry, glowMaterial);
                group.add(glow);
            }
            const angle = idx / question.sequence.length * Math.PI * 2;
            group.position.x = Math.cos(angle) * 10;
            group.position.y = Math.sin(angle) * 10;
            group.userData = {
                targetX: group.position.x,
                targetY: group.position.y,
                number: num,
                index: idx,
                isNull: isNull
            };
            scene.add(group);
            groups.push(group);
        });
        const { particles: bgParticles, update: updateParticles } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2d$helpers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createParticleSystem"])(180, 0xff6b35, {
            size: 0.07,
            spread: 60,
            speed: 0.35
        });
        scene.add(bgParticles);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$three$2d$helpers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createEnhancedLights"])(scene, {
            intensity: 3.5,
            distance: 200
        });
        const accentLight1 = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PointLight"](0xff6b35, 3, 150);
        accentLight1.position.set(30, 30, 30);
        scene.add(accentLight1);
        const accentLight2 = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PointLight"](0xff4757, 2.5, 150);
        accentLight2.position.set(-30, -30, 30);
        scene.add(accentLight2);
        // Store null groups for raycaster
        nullGroupsRef.current = groups.filter((g)=>g.userData.isNull);
        // Raycaster for clicking on null position in sequence
        const raycaster = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Raycaster"]();
        const mouse = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Vector2"]();
        let hoveredNull = null;
        let rafId = null;
        const handleMouseMove = (e)=>{
            if (answered || rafId !== null) return;
            rafId = requestAnimationFrame(()=>{
                const rect = container.getBoundingClientRect();
                mouse.x = (e.clientX - rect.left) / rect.width * 2 - 1;
                mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
                raycaster.setFromCamera(mouse, camera);
                const intersects = raycaster.intersectObjects(nullGroupsRef.current, true);
                if (intersects.length > 0) {
                    const clickedObject = intersects[0].object;
                    const nullGroup = clickedObject.parent;
                    if (nullGroup && nullGroup.userData.isNull) {
                        if (hoveredNull !== nullGroup) {
                            if (hoveredNull) hoveredNull.userData.hovered = false;
                            hoveredNull = nullGroup;
                            nullGroup.userData.hovered = true;
                        }
                    }
                } else {
                    if (hoveredNull) {
                        hoveredNull.userData.hovered = false;
                        hoveredNull = null;
                    }
                }
                rafId = null;
            });
        };
        const handleClick = (e)=>{
            if (answered) return;
            const rect = container.getBoundingClientRect();
            mouse.x = (e.clientX - rect.left) / rect.width * 2 - 1;
            mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
            raycaster.setFromCamera(mouse, camera);
            const nullGroups = groups.filter((g)=>g.userData.isNull);
            const intersects = raycaster.intersectObjects(nullGroups, true);
            if (intersects.length > 0) {
                const clickedObject = intersects[0].object;
                const nullGroup = clickedObject.parent;
                if (nullGroup && nullGroup.userData.isNull) {
                    const nullIndex = groups.findIndex((g)=>g === nullGroup);
                    setClickedNullIndex(nullIndex);
                    setShowOptionPopup(true);
                }
            }
        };
        container.addEventListener("mousemove", handleMouseMove);
        container.addEventListener("click", handleClick);
        let animationId;
        let lastTime = 0;
        const targetFPS = 60;
        const frameInterval = 1000 / targetFPS;
        const animate = (currentTime)=>{
            animationId = requestAnimationFrame(animate);
            const deltaTime = currentTime - lastTime;
            if (deltaTime < frameInterval) return;
            lastTime = currentTime - deltaTime % frameInterval;
            const time = currentTime * 0.001;
            updateParticles(time);
            groups.forEach((group)=>{
                if (group.userData.number !== undefined || group.userData.number === null) {
                    group.rotation.x += __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GAME_CONFIG"].ANIMATION.ROTATION_SPEED * 1.2;
                    group.rotation.y += __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GAME_CONFIG"].ANIMATION.ROTATION_SPEED * 1.4;
                    const floatY = Math.sin(time + group.userData.index) * __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GAME_CONFIG"].ANIMATION.FLOAT_AMPLITUDE * 1.3;
                    group.position.y = group.userData.targetY + floatY;
                    const mouseInfluence = (mouseRef.current.x * 5 - group.position.x * 0.02) * __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GAME_CONFIG"].ANIMATION.MOUSE_INFLUENCE;
                    group.position.x += mouseInfluence;
                    if (group.userData.isNull) {
                        const pulse = Math.sin(time * 2.5) * 0.3 + 0.7;
                        group.scale.set(pulse, pulse, pulse);
                        group.children.forEach((child)=>{
                            if (child instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mesh"] && child.material instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MeshBasicMaterial"] && child.material.wireframe) {
                                child.rotation.x += 0.02;
                                child.rotation.y += 0.02;
                            }
                        });
                    }
                }
            });
            // Enhanced hover effect for null position
            groups.forEach((group)=>{
                if (group.userData.isNull && group.userData.hovered) {
                    const pulse = Math.sin(time * 3) * 0.2 + 1.2;
                    group.scale.set(pulse, pulse, pulse);
                }
            });
            renderer.render(scene, camera);
        };
        animate(0);
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
        selectedAnswer,
        answered,
        score,
        loading,
        questions
    ]);
    const handleAnswer = (option)=>{
        if (answered) return;
        const question = questions[currentQuestion];
        if (!question) return;
        setSelectedAnswer(option);
        setAnswered(true);
        if (option === question.correct) {
            setScore((prev)=>prev + 1);
        }
    };
    const handleNext = ()=>{
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion((prev)=>prev + 1);
            setAnswered(false);
            setSelectedAnswer(null);
            setShowOptionPopup(false);
            setClickedNullIndex(null);
        }
    };
    const handleRestart = ()=>{
        setCurrentQuestion(0);
        setScore(0);
        setAnswered(false);
        setSelectedAnswer(null);
        setShowOptionPopup(false);
        setClickedNullIndex(null);
    };
    // Early return if loading or no questions
    if (loading || questions.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative w-full h-full flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-white text-xl",
                children: "Đang tải..."
            }, void 0, false, {
                fileName: "[project]/components/games/missing-number-game.tsx",
                lineNumber: 402,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/games/missing-number-game.tsx",
            lineNumber: 401,
            columnNumber: 7
        }, this);
    }
    // Ensure currentQuestion is within bounds
    if (currentQuestion < 0 || currentQuestion >= questions.length) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative w-full h-full flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-white text-xl",
                children: "Câu hỏi không hợp lệ"
            }, void 0, false, {
                fileName: "[project]/components/games/missing-number-game.tsx",
                lineNumber: 411,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/games/missing-number-game.tsx",
            lineNumber: 410,
            columnNumber: 7
        }, this);
    }
    const question = questions[currentQuestion];
    // Early return if question doesn't exist or is invalid
    if (!question || !question.sequence || !Array.isArray(question.sequence)) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative w-full h-full flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-white text-xl",
                children: "Không tìm thấy câu hỏi"
            }, void 0, false, {
                fileName: "[project]/components/games/missing-number-game.tsx",
                lineNumber: 422,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/games/missing-number-game.tsx",
            lineNumber: 421,
            columnNumber: 7
        }, this);
    }
    const isGameComplete = currentQuestion === questions.length - 1 && answered;
    const nullIndex = question.sequence.findIndex((n)=>n === null);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative w-full h-full flex flex-col",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: canvasRef,
                className: "absolute inset-0 -z-10"
            }, void 0, false, {
                fileName: "[project]/components/games/missing-number-game.tsx",
                lineNumber: 432,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "absolute top-3 sm:top-4 left-3 sm:left-4 flex gap-2 sm:gap-3 z-30",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onBack,
                        className: "btn-modern flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white rounded-xl text-sm sm:text-base font-semibold shadow-lg",
                        "aria-label": __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UI_TEXT"].COMMON.BACK,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                size: 16,
                                className: "sm:w-[18px] sm:h-[18px]"
                            }, void 0, false, {
                                fileName: "[project]/components/games/missing-number-game.tsx",
                                lineNumber: 440,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "hidden sm:inline",
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UI_TEXT"].COMMON.BACK
                            }, void 0, false, {
                                fileName: "[project]/components/games/missing-number-game.tsx",
                                lineNumber: 441,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/games/missing-number-game.tsx",
                        lineNumber: 435,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: guidePath,
                        className: "btn-modern flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 text-white rounded-xl text-sm sm:text-base font-semibold shadow-lg",
                        "aria-label": "Quay về trang hướng dẫn",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"], {
                                size: 16,
                                className: "sm:w-[18px] sm:h-[18px]"
                            }, void 0, false, {
                                fileName: "[project]/components/games/missing-number-game.tsx",
                                lineNumber: 448,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "hidden sm:inline",
                                children: "Hướng Dẫn"
                            }, void 0, false, {
                                fileName: "[project]/components/games/missing-number-game.tsx",
                                lineNumber: 449,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/games/missing-number-game.tsx",
                        lineNumber: 443,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleRestart,
                        className: "btn-modern flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white rounded-xl text-sm sm:text-base font-semibold shadow-lg",
                        "aria-label": __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UI_TEXT"].COMMON.RESTART,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__["RotateCcw"], {
                                size: 16,
                                className: "sm:w-[18px] sm:h-[18px]"
                            }, void 0, false, {
                                fileName: "[project]/components/games/missing-number-game.tsx",
                                lineNumber: 456,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "hidden sm:inline",
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UI_TEXT"].COMMON.RESTART
                            }, void 0, false, {
                                fileName: "[project]/components/games/missing-number-game.tsx",
                                lineNumber: 457,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/games/missing-number-game.tsx",
                        lineNumber: 451,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/games/missing-number-game.tsx",
                lineNumber: 434,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-4 right-4 z-30",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "glass-strong px-3 sm:px-4 py-2 rounded-xl border border-orange-400/40 shadow-lg bg-gradient-to-r from-orange-900/30 to-red-900/30",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-lg sm:text-xl font-black text-orange-300 flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "⭐"
                            }, void 0, false, {
                                fileName: "[project]/components/games/missing-number-game.tsx",
                                lineNumber: 464,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UI_TEXT"].COMMON.SCORE,
                                    ": ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-orange-200",
                                        children: score
                                    }, void 0, false, {
                                        fileName: "[project]/components/games/missing-number-game.tsx",
                                        lineNumber: 466,
                                        columnNumber: 39
                                    }, this),
                                    "/",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-orange-400",
                                        children: questions.length
                                    }, void 0, false, {
                                        fileName: "[project]/components/games/missing-number-game.tsx",
                                        lineNumber: 467,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/games/missing-number-game.tsx",
                                lineNumber: 465,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/games/missing-number-game.tsx",
                        lineNumber: 463,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/games/missing-number-game.tsx",
                    lineNumber: 462,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/games/missing-number-game.tsx",
                lineNumber: 461,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "absolute inset-0 flex items-center justify-center px-4 py-20 z-20 overflow-y-auto",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "glass-strong p-6 sm:p-8 rounded-3xl max-w-5xl w-full border-2 border-orange-400/60 shadow-2xl relative overflow-hidden bg-gradient-to-br from-orange-950/30 via-red-950/25 to-orange-950/30 my-8 backdrop-blur-xl",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            className: "mb-8 relative z-10",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3 mb-5",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-orange-200 font-bold px-4 py-2 bg-orange-500/30 rounded-full border border-orange-400/50",
                                        children: [
                                            "Câu ",
                                            currentQuestion + 1,
                                            "/",
                                            questions.length
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/games/missing-number-game.tsx",
                                        lineNumber: 478,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/games/missing-number-game.tsx",
                                    lineNumber: 477,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-300 via-red-300 to-orange-300 mb-6 sm:mb-8",
                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UI_TEXT"].MISSING_NUMBER.TITLE
                                }, void 0, false, {
                                    fileName: "[project]/components/games/missing-number-game.tsx",
                                    lineNumber: 482,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm sm:text-base text-orange-100 mb-4 sm:mb-6 font-medium text-center",
                                    children: [
                                        "Click vào vị trí ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-orange-300 font-bold",
                                            children: "?"
                                        }, void 0, false, {
                                            fileName: "[project]/components/games/missing-number-game.tsx",
                                            lineNumber: 486,
                                            columnNumber: 32
                                        }, this),
                                        " để chọn số điền vào"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/games/missing-number-game.tsx",
                                    lineNumber: 485,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-3 sm:gap-4 justify-center items-center mb-6 sm:mb-8 flex-wrap",
                                    children: question.sequence.map((num, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: num !== null ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "number-badge w-14 h-14 sm:w-16 sm:h-16 text-xl sm:text-2xl bg-gradient-to-br from-orange-500 to-red-600 shadow-lg border-orange-400/50",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: num
                                                }, void 0, false, {
                                                    fileName: "[project]/components/games/missing-number-game.tsx",
                                                    lineNumber: 496,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/games/missing-number-game.tsx",
                                                lineNumber: 495,
                                                columnNumber: 21
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 rounded-xl flex items-center justify-center text-xl sm:text-2xl font-black border-2 border-dashed shadow-lg transition-all duration-200 cursor-pointer ${clickedNullIndex === idx ? "border-orange-400 scale-110 shadow-orange-500/50 bg-orange-900/30" : selectedAnswer !== null && idx === nullIndex ? selectedAnswer === question.correct ? "border-green-400 bg-green-900/30" : "border-red-400 bg-red-900/30" : "border-orange-400 hover:border-orange-300 hover:scale-105"}`,
                                                onClick: ()=>{
                                                    if (!answered && num === null) {
                                                        setClickedNullIndex(idx);
                                                        setShowOptionPopup(true);
                                                    }
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: selectedAnswer !== null && idx === nullIndex ? selectedAnswer === question.correct ? "text-green-400" : "text-red-400" : "text-orange-400",
                                                    children: selectedAnswer !== null && idx === nullIndex ? selectedAnswer : "?"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/games/missing-number-game.tsx",
                                                    lineNumber: 516,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/games/missing-number-game.tsx",
                                                lineNumber: 499,
                                                columnNumber: 21
                                            }, this)
                                        }, `${num}-${idx}`, false, {
                                            fileName: "[project]/components/games/missing-number-game.tsx",
                                            lineNumber: 491,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/components/games/missing-number-game.tsx",
                                    lineNumber: 489,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/games/missing-number-game.tsx",
                            lineNumber: 476,
                            columnNumber: 11
                        }, this),
                        showOptionPopup && !answered && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "glass-strong p-6 sm:p-8 rounded-3xl max-w-md w-full border-2 border-orange-500/50 shadow-xl bg-gradient-to-br from-orange-950/30 to-red-950/30 relative z-50",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-2xl font-black text-orange-200 mb-6 text-center",
                                            children: "Chọn số để điền vào vị trí trống"
                                        }, void 0, false, {
                                            fileName: "[project]/components/games/missing-number-game.tsx",
                                            lineNumber: 536,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-2 gap-3 sm:gap-4",
                                            children: question.options.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>{
                                                        handleAnswer(option);
                                                        setShowOptionPopup(false);
                                                        setClickedNullIndex(null);
                                                    },
                                                    className: "answer-btn py-5 sm:py-6 px-6 sm:px-8 text-xl sm:text-2xl font-black bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 transition-all duration-200 rounded-xl shadow-lg",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: option
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/games/missing-number-game.tsx",
                                                        lineNumber: 550,
                                                        columnNumber: 25
                                                    }, this)
                                                }, option, false, {
                                                    fileName: "[project]/components/games/missing-number-game.tsx",
                                                    lineNumber: 541,
                                                    columnNumber: 23
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/components/games/missing-number-game.tsx",
                                            lineNumber: 539,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>{
                                                setShowOptionPopup(false);
                                                setClickedNullIndex(null);
                                            },
                                            className: "mt-6 w-full py-3 px-6 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white font-semibold rounded-xl transition-all",
                                            children: "Hủy"
                                        }, void 0, false, {
                                            fileName: "[project]/components/games/missing-number-game.tsx",
                                            lineNumber: 554,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/games/missing-number-game.tsx",
                                    lineNumber: 535,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/games/missing-number-game.tsx",
                                lineNumber: 534,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/games/missing-number-game.tsx",
                            lineNumber: 533,
                            columnNumber: 13
                        }, this),
                        !answered && !showOptionPopup && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            className: "space-y-6 relative z-10",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center mb-6",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-base text-orange-200 mb-3 font-semibold",
                                    children: "Click vào vị trí trống để chọn số"
                                }, void 0, false, {
                                    fileName: "[project]/components/games/missing-number-game.tsx",
                                    lineNumber: 571,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/games/missing-number-game.tsx",
                                lineNumber: 570,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/games/missing-number-game.tsx",
                            lineNumber: 569,
                            columnNumber: 13
                        }, this),
                        answered && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            className: "text-center fade-in relative z-10",
                            children: [
                                selectedAnswer === question.correct ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mb-6 sm:mb-8",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-6xl sm:text-8xl mb-4 sm:mb-6",
                                            children: "🌟"
                                        }, void 0, false, {
                                            fileName: "[project]/components/games/missing-number-game.tsx",
                                            lineNumber: 582,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-2xl sm:text-3xl font-black text-green-400 mb-2 sm:mb-3",
                                            children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UI_TEXT"].MISSING_NUMBER.CORRECT
                                        }, void 0, false, {
                                            fileName: "[project]/components/games/missing-number-game.tsx",
                                            lineNumber: 583,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-base sm:text-lg text-orange-100 font-medium",
                                            children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UI_TEXT"].MISSING_NUMBER.CORRECT_DESC
                                        }, void 0, false, {
                                            fileName: "[project]/components/games/missing-number-game.tsx",
                                            lineNumber: 586,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/games/missing-number-game.tsx",
                                    lineNumber: 581,
                                    columnNumber: 17
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mb-6 sm:mb-8",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-6xl sm:text-8xl mb-4 sm:mb-6",
                                            children: "🤔"
                                        }, void 0, false, {
                                            fileName: "[project]/components/games/missing-number-game.tsx",
                                            lineNumber: 590,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-2xl sm:text-3xl font-black text-orange-400 mb-2 sm:mb-3",
                                            children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UI_TEXT"].MISSING_NUMBER.INCORRECT
                                        }, void 0, false, {
                                            fileName: "[project]/components/games/missing-number-game.tsx",
                                            lineNumber: 591,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-base sm:text-lg text-orange-100 font-medium",
                                            children: [
                                                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UI_TEXT"].MISSING_NUMBER.CORRECT_ANSWER,
                                                " ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-black text-green-400 text-xl sm:text-2xl",
                                                    children: question.correct
                                                }, void 0, false, {
                                                    fileName: "[project]/components/games/missing-number-game.tsx",
                                                    lineNumber: 596,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/games/missing-number-game.tsx",
                                            lineNumber: 594,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/games/missing-number-game.tsx",
                                    lineNumber: 589,
                                    columnNumber: 17
                                }, this),
                                !isGameComplete && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleNext,
                                    className: "btn-modern mt-6 sm:mt-8 px-8 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 hover:from-green-500 hover:via-emerald-500 hover:to-green-500 text-white font-black rounded-2xl text-base sm:text-lg shadow-xl",
                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UI_TEXT"].COMMON.NEXT_QUESTION
                                }, void 0, false, {
                                    fileName: "[project]/components/games/missing-number-game.tsx",
                                    lineNumber: 602,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/games/missing-number-game.tsx",
                            lineNumber: 579,
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
                                            fileName: "[project]/components/games/missing-number-game.tsx",
                                            lineNumber: 615,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xl sm:text-2xl text-orange-100 mb-2 font-bold",
                                            children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UI_TEXT"].MISSING_NUMBER.COMPLETE
                                        }, void 0, false, {
                                            fileName: "[project]/components/games/missing-number-game.tsx",
                                            lineNumber: 616,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-2xl sm:text-3xl text-orange-300 font-black mb-3 sm:mb-4",
                                            children: [
                                                score,
                                                " ",
                                                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UI_TEXT"].MISSING_NUMBER.POINTS
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/games/missing-number-game.tsx",
                                            lineNumber: 619,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/games/missing-number-game.tsx",
                                    lineNumber: 614,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleRestart,
                                    className: "btn-modern px-8 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 hover:from-orange-500 hover:via-red-500 hover:to-orange-500 text-white font-black rounded-2xl text-base sm:text-lg shadow-xl",
                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UI_TEXT"].COMMON.PLAY_AGAIN
                                }, void 0, false, {
                                    fileName: "[project]/components/games/missing-number-game.tsx",
                                    lineNumber: 623,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/games/missing-number-game.tsx",
                            lineNumber: 613,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/games/missing-number-game.tsx",
                    lineNumber: 474,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/games/missing-number-game.tsx",
                lineNumber: 473,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/games/missing-number-game.tsx",
        lineNumber: 431,
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
"[project]/app/missing-number/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MissingNumberPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$games$2f$missing$2d$number$2d$game$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/games/missing-number-game.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$solar$2d$system$2d$background$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/solar-system-background.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function MissingNumberPage() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const handleBack = ()=>{
        router.push("/");
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$solar$2d$system$2d$background$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/app/missing-number/page.tsx",
                lineNumber: 16,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative z-10 w-full h-screen overflow-hidden",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$games$2f$missing$2d$number$2d$game$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    onBack: handleBack,
                    guidePath: "/missing-number/guide"
                }, void 0, false, {
                    fileName: "[project]/app/missing-number/page.tsx",
                    lineNumber: 18,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/missing-number/page.tsx",
                lineNumber: 17,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}),
];

//# sourceMappingURL=_5b90527c._.js.map