type EquationProps = {
    a: number;
    b: number;
    c: number;
    d: number;
};

export const CubicEquation = ({ a, b, c, d }: EquationProps) => {
    return (
        <h2 className="text-sm font-bold text-gray-600 text-[20px]">
            {
                `${a === 1 ? "" : a}x³` +
                `${b === 0 ? "" : b === 1 ? ` + x²` : b === -1 ? ` - x²` : b > 0 ? ` + ${b}x²` : ` - ${Math.abs(b)}x²`}` +
                `${c === 0 ? "" : c === 1 ? ` + x` : c === -1 ? ` - x` : c > 0 ? ` + ${c}x` : ` - ${Math.abs(c)}x`}` +
                `${d === 0 ? "" : d > 0 ? ` + ${d}` : ` - ${Math.abs(d)}`}` +
                ` = 0`
            }
        </h2>
    );
};