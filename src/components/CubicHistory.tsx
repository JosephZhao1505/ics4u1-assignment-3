type HistoryProps = {
    history: { a: number; b: number; c: number; d: number }[];
    setA: (value: number) => void;
    setB: (value: number) => void;
    setC: (value: number) => void;
    setD: (value: number) => void;
}

export const CubicHistory = ({ history, setA, setB, setC, setD }: HistoryProps) => {
    return (
        <div className="history-container p-4 border border-gray-200 rounded-lg bg-white w-full max-w-md">
            <h3 className="text-sm font-bold mb-3 text-gray-600 uppercase tracking-wider">History</h3>
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-gray-100">
                        <th className="pb-2 text-sm font-bold text-gray-600 px-2">a</th>
                        <th className="pb-2 text-sm font-bold text-gray-600 px-2">b</th>
                        <th className="pb-2 text-sm font-bold text-gray-600 px-2">c</th>
                        <th className="pb-2 text-sm font-bold text-gray-600 px-2">d</th>
                        {/* text-sm font-bold mb-1 text-gray-600 */}
                    </tr>
                </thead>
                <tbody>
                    {history.map((coefficient, index) => (
                        <tr
                            key={index}
                            onClick={() => {
                                setA(coefficient.a);
                                setB(coefficient.b);
                                setC(coefficient.c);
                                setD(coefficient.d);
                            }}
                            className="cursor-pointer hover:bg-blue-50 transition-colors group"
                        >
                            <td className="py-2 px-2 border-b border-gray-50 text-slate-700">
                                <div className="p-1 border border-gray-200 rounded bg-gray-50 group-hover:border-blue-200">{coefficient.a}</div>
                            </td>
                            <td className="py-2 px-2 border-b border-gray-50 text-slate-700">
                                <div className="p-1 border border-gray-200 rounded bg-gray-50 group-hover:border-blue-200">{coefficient.b}</div>
                            </td>
                            <td className="py-2 px-2 border-b border-gray-50 text-slate-700">
                                <div className="p-1 border border-gray-200 rounded bg-gray-50 group-hover:border-blue-200">{coefficient.c}</div>
                            </td>
                            <td className="py-2 px-2 border-b border-gray-50 text-slate-700">
                                <div className="p-1 border border-gray-200 rounded bg-gray-50 group-hover:border-blue-200">{coefficient.d}</div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};