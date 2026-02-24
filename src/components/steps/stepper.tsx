type StepperProps = {
  activeStep: 1 | 2 | 3 | 4;
};

export function Stepper({ activeStep }: StepperProps) {
  const steps = [1, 2, 3, 4];

  return (
    <div className="flex items-center justify-center w-full">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center">
          
          {/* Círculo */}
          <div
            className={`
              w-10 h-10 
              flex items-center justify-center 
              rounded-full 
              text-sm font-semibold
              transition-all duration-300
              ${
                step === activeStep
                  ? "bg-yellow-400 text-black"
                  : "bg-gray-800 text-white"
              }
            `}
          >
            {step}
          </div>

          {/* Linha */}
          {index < steps.length - 1 && (
            <div className="w-16 h-[2px] bg-gray-800" />
          )}
        </div>
      ))}
    </div>
  );
}