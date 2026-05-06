
import { cn } from "@/lib/utils";

interface BgGradientProps {
    className?: string;
    gradientFrom?: string;
    gradientTo?: string;
    gradientSize?: string;
    gradientPosition?: string;
    gradientStop?: string;
}

export const BgGradient = ({
    className,
    gradientFrom = "#FFFFFF", // Default white
    gradientTo = "#ffea04ff", // Very light yellow (Yellow-50)
    gradientSize = "125% 125%",
    gradientPosition = "50% 10%",
    gradientStop = "40%"
}: BgGradientProps) => {
    return (
        <div
            className={cn(
                "absolute inset-0 w-full h-full -z-10 bg-white",
                className
            )}
            style={{
                background: `radial-gradient(${gradientSize} at ${gradientPosition}, ${gradientFrom} ${gradientStop}, ${gradientTo} 100%)`
            }}
        />
    );
};
