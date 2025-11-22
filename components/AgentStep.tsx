// "use client";
// import { motion } from "framer-motion";
// import React from "react";

// interface AgentStepProps {
//   label: string;
//   status: "pending" | "running" | "done";
// }

// export default function AgentStep({ label, status }: AgentStepProps) {
//   return (
//     <div className="flex items-center space-x-4 py-3">
//       {/* Status dot */}
//       <div className="relative">
//         {status === "running" && (
//           <motion.div
//             className="absolute w-5 h-5 bg-blue-400 rounded-full opacity-50"
//             animate={{ scale: [1, 1.6, 1] }}
//             transition={{ duration: 1, repeat: Infinity }}
//           />
//         )}

//         <div
//           className={`w-4 h-4 rounded-full ${
//             status === "done"
//               ? "bg-green-500"
//               : status === "running"
//               ? "bg-blue-600"
//               : "bg-gray-300"
//           }`}
//         ></div>
//       </div>

//       {/* Label */}
//       <p
//         className={`text-lg font-medium ${
//           status === "done" ? "text-green-600" : ""
//         }`}
//       >
//         {label}
//       </p>
//     </div>
//   );
// }

"use client";

import { motion } from "framer-motion";

export default function AgentStep({
  label,
  status,
}: {
  label: string;
  status: "pending" | "running" | "done";
}) {
  const getColor = () => {
    if (status === "done") return "bg-green-500";
    if (status === "running") return "bg-blue-500 animate-pulse";
    return "bg-gray-300";
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -15 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center space-x-4"
    >
      <div className={`w-4 h-4 rounded-full ${getColor()}`} />

      <p
        className={`text-lg font-semibold ${
          status === "running" ? "text-blue-600" : ""
        }`}
      >
        {label}
      </p>
    </motion.div>
  );
}
