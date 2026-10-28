import { useEffect, useState } from "react";

// عداد تنازلي: بيبدأ من رقم وينزل ثانية بثانية لحد الصفر
export function useCountdown(initialSeconds: number) {
    const [secondsLeft, setSecondsLeft] = useState(initialSeconds);

    useEffect(() => {
        if (secondsLeft <= 0) return; // وصل صفر؟ وقف
        const id = setTimeout(() => setSecondsLeft((s) => s - 1), 1000); 
        return () => clearTimeout(id); 
    }, [secondsLeft]);

    function restart() {
        setSecondsLeft(initialSeconds);
    }

    return { secondsLeft, restart };
}
