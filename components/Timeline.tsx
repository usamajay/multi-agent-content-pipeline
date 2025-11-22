// import React from "react";

// interface TimelineProps {
//   steps: {
//     label: string;
//     status: "pending" | "running" | "done";  // ← FIXED HERE
//   }[];
// }

// export default function Timeline({ steps }: TimelineProps) {
//   return (
//     <div className="mt-8">
//       {steps.map((step, index) => (
//         <div key={index} className="flex items-start space-x-3 mb-6">
//           {/* Status Indicator */}
//           <div>
//             {step.status === "done" && (
//               <div className="w-4 h-4 bg-green-500 rounded-full mt-1"></div>
//             )}

//             {step.status === "running" && (
//               <div className="w-4 h-4 bg-blue-500 rounded-full animate-ping mt-1"></div>
//             )}

//             {step.status === "pending" && (
//               <div className="w-4 h-4 bg-gray-300 rounded-full mt-1"></div>
//             )}
//           </div>

//           {/* Label */}
//           <p className="text-lg font-medium">{step.label}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

"use client";

import React from "react";
import AgentStep from "./AgentStep";

interface TimelineProps {
  steps: {
    label: string;
    status: "pending" | "running" | "done";
  }[];
}

export default function Timeline({ steps }: TimelineProps) {
  return (
    <div className="mt-10 space-y-4">
      {steps.map((step, i) => (
        <AgentStep key={i} label={step.label} status={step.status} />
      ))}
    </div>
  );
}
