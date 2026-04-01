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
        <div className="min-h-screen bg-[#f4f7f6] p-5 flex flex-col items-center font-sans text-[#333]">
            <div className="flex flex-col md:flex-row items-start gap-8 bg-white p-[30px] rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.1)] w-fit mx-auto my-5">

                <div className="flex flex-col min-w-[250px]">
                    <form className="flex flex-col">

                        <div className="flex flex-col gap-3 mb-5">
                            <input value={r1} type="text" placeholder="Result 1" readOnly className="p-2 bg-[#f9f9f9] text-[#2c3e50] border border-[#e0e0e0] rounded" />
                            <input value={r2} type="text" placeholder="Result 2" readOnly className="p-2 bg-[#f9f9f9] text-[#2c3e50] border border-[#e0e0e0] rounded" />
                            <input value={r3} type="text" placeholder="Result 3" readOnly className="p-2 bg-[#f9f9f9] text-[#2c3e50] border border-[#e0e0e0] rounded" />
                            <input value={discriminant} type="text" placeholder="Discriminant" readOnly className="p-2 bg-[#f9f9f9] text-[#2c3e50] border border-[#e0e0e0] rounded" />
                            <input value={pValue} type="text" placeholder="P Value" readOnly className="p-2 bg-[#f9f9f9] text-[#2c3e50] border border-[#e0e0e0] rounded" />
                            <input value={qValue} type="text" placeholder="Q Value" readOnly className="p-2 bg-[#f9f9f9] text-[#2c3e50] border border-[#e0e0e0] rounded" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}