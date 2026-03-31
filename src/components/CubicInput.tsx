type InputProps = {
    a: number;
    b: number;
    c: number;
    d: number;
    setA: (value: number) => void;
    setB: (value: number) => void;
    setC: (value: number) => void;
    setD: (value: number) => void;
}

export const CubicInput = ({ a, b, c, d, setA, setB, setC, setD }: InputProps) => {
    console.log(a, b, c, d, setA, setB, setC, setD)
    return (
        <div className="min-h-screen bg-[#f4f7f6] p-5 flex flex-col items-center font-sans text-[#333]">
            <h1 className="text-2xl font-bold my-1 text-center">Cubic Solver</h1>
            <h5 className="text-base font-normal text-[#666] max-w-[600px] mb-5 text-center leading-tight">
                Welcome to a cubic solver, you will probably find many more that may or may not be much better than this one. Please waste your time here.
            </h5>

            <div className="flex flex-col md:flex-row items-start gap-8 bg-white p-[30px] rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.1)] w-fit mx-auto my-5">

                <div className="flex flex-col min-w-[250px]">
                    <form className="flex flex-col">

                        <div className="flex flex-col border-b-2 border-gray-100 pb-5 mb-5">
                            <label className="text-[0.9rem] font-bold mb-1 text-[#555]">a-value:</label>
                            <input
                                type="number"
                                step="any"
                                value={a}
                                onChange={(e) => setA(Number(e.target.value))}
                                required
                                className="p-2 mb-4 border border-gray-300 rounded text-base focus:ring-2 focus:ring-blue-400 outline-none"
                            />

                            <label className="text-[0.9rem] font-bold mb-1 text-[#555]">b-value:</label>
                            <input
                                type="number"
                                step="any"
                                value={b}
                                onChange={(e) => setB(Number(e.target.value))}
                                required
                                className="p-2 mb-4 border border-gray-300 rounded text-base focus:ring-2 focus:ring-blue-400 outline-none"
                            />

                            <label className="text-[0.9rem] font-bold mb-1 text-[#555]">c-value:</label>
                            <input
                                type="number"
                                step="any"
                                value={c}
                                onChange={(e) => setC(Number(e.target.value))}
                                required
                                className="p-2 mb-4 border border-gray-300 rounded text-base focus:ring-2 focus:ring-blue-400 outline-none"
                            />

                            <label className="text-[0.9rem] font-bold mb-1 text-[#555]">d-value:</label>
                            <input
                                type="number"
                                step="any"
                                value={d}
                                onChange={(e) => setD(Number(e.target.value))}
                                required
                                className="p-2 mb-4 border border-gray-300 rounded text-base focus:ring-2 focus:ring-blue-400 outline-none"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}