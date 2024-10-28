"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Stage } from "@react-three/drei";
import { motion } from "framer-motion-3d";
import { MotionConfig } from "framer-motion";

function CoffeeModel() {
  const gltf = useGLTF("/coffee.glb");
  
  return (
    <motion.group
      animate={{
        rotateY: 360,
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <primitive object={gltf.scene} />
    </motion.group>
  );
}

export function CoffeeCanvas() {
  return (
    <div className="w-full h-[500px]">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <Stage environment="city" intensity={0.6}>
            <MotionConfig transition={{ duration: 0.5 }}>
              <CoffeeModel />
            </MotionConfig>
          </Stage>
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={4}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
