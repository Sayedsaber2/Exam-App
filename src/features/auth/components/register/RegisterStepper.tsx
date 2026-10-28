import { useState } from "react";
import type { RegisterDataValues } from "../../schemas/register.schema";
import EmailStep from "./EmailStep";
import StepIndicator from "./StepIndicator";
import VerifyOtpStep from "./VerifyOtpStep";
import UserInfoStep from "./UserInfoStep";
import PasswordStep from "./PasswordStep";


export default function RegisterStepper() {
    const [step, setStep] = useState(1);
    const [data, setData] = useState<Partial<RegisterDataValues>>({});

    function goNext(values: Partial<RegisterDataValues>) {
        setData(prev => ({ ...prev, ...values }));
        setStep(prev => prev + 1);
    }

    function goBack() {
        setStep(prev => prev - 1);
    }
    return <>
        <div className="w-full max-w-xl space-y-6">
            {step > 1 && <StepIndicator current={step} total={4} />}

            {step === 1 && <EmailStep onNext={goNext} />}
            {step === 2 && <VerifyOtpStep email={data.email ?? ""} onNext={goNext} onBack={goBack} />}
            {step === 3 && <UserInfoStep onNext={goNext} />}
            {step === 4 && <PasswordStep data={data} />}
        </div>


    </>;
}
