import { Progress } from "@/components/ui/progress";
import React, {useState, useEffect} from "react";

const LoadingProgress = () => {
      const [progress, setProgress] = React.useState(13);

      React.useEffect(() => {
          const timer = setTimeout(() => setProgress(80), 30);
          return () => clearTimeout(timer);
      }, []);

      return <Progress value={progress} className="w-[60%]" />;
};

export default LoadingProgress;
