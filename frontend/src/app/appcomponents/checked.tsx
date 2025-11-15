import { useMotionValue, useTransform } from 'framer-motion';
import { motion } from 'framer-motion';
import React from 'react';
type ToggleCheckProps = {
    value: boolean;
};
const ToogleCheck = ({ value }: ToggleCheckProps) => {
    const [isChecked, setisChecked] = React.useState(value);
    const pathlength = useMotionValue(0);
    const opacity = useTransform(pathlength, [0.05, 0.15], [0, 1]);

    return (
        <div>
            <motion.div
                animate={{
                    scale: isChecked ? 1 : 0.8,
                    backgroundColor: isChecked ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0.5)"
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                onTap={() => setisChecked(!isChecked)}

            >
                <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150">
                    <motion.path
                        d="M38 74.707l24.647 24.646L116.5 45.5"
                        fill="transparent"
                        strokeWidth="20"
                        stroke="#39e"
                        strokeLinecap="round"
                        animate={{ pathLength: isChecked ? 0.9 : 0 }}
                        style={{ pathLength: pathlength, opacity }}
                    // transition={{ duration: 3 }}
                    />
                </svg>

            </motion.div>


        </div>
    )
}

export default ToogleCheck;