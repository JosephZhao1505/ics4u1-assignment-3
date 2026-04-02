type ResultProps = {
    r1: string;
    r2: string;
    r3: string;
    discriminant: string;
    pValue: string;
    qValue: string;
}

export const CubicTable = ({ r1, r2, r3, discriminant, pValue, qValue }: ResultProps) => {
    return (
        <div className="flex flex-col w-[250px]">

            <label className="text-sm font-bold mb-1 text-gray-600">Result 1:</label>
            <input className="p-2 mb-4 border border-gray-200 rounded bg-gray-50 text-slate-700" value={r1} readOnly />

            <label className="text-sm font-bold mb-1 text-gray-600">Result 2:</label>
            <input className="p-2 mb-4 border border-gray-200 rounded bg-gray-50 text-slate-700" value={r2} readOnly />

            <label className="text-sm font-bold mb-1 text-gray-600">Result 3:</label>
            <input className="p-2 mb-4 border border-gray-200 rounded bg-gray-50 text-slate-700" value={r3} readOnly />

            <label className="text-sm font-bold mb-1 text-gray-600">Discriminant:</label>
            <input className="p-2 mb-4 border border-gray-200 rounded bg-gray-50 text-slate-700" value={discriminant} readOnly />

            <label className="text-sm font-bold mb-1 text-gray-600">p:</label>
            <input className="p-2 mb-4 border border-gray-200 rounded bg-gray-50 text-slate-700" value={pValue} readOnly />

            <label className="text-sm font-bold mb-1 text-gray-600">q:</label>
            <input className="p-2 mb-4 border border-gray-200 rounded bg-gray-50 text-slate-700" value={qValue} readOnly />

        </div>
    )
}