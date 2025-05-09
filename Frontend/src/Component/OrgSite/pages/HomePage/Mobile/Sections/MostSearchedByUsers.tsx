interface IPopularSearches {
    name: string;
    bgColor: string;
}

const popularSearches: IPopularSearches[] = [
    { name: "SIM Card Modem", bgColor: "bg-blue-500" },
    { name: "rtx 5090", bgColor: "bg-green-500" },
    { name: "a 56", bgColor: "bg-yellow-500" },
    { name: "lorem ipsum", bgColor: "bg-red-500" },
    { name: "lorem", bgColor: "bg-orange-500" },
    { name: "Sapling", bgColor: "bg-purple-500" },
    { name: "lorem", bgColor: "bg-pink-500" },
    { name: "lorem ipsum dollar", bgColor: "bg-teal-500" },
]

function MostSearchedByUsers() {
    return (
        <>
            <div className="flex flex-col mx-3 gap-2 text-center md:hidden">
                <p className="font-semibold mb-3">Most Searched by Users</p>
                <div className="grid grid-cols-2 gap-3 text-white font-semibold text-sm">
                    {popularSearches.map(((i, index) => (
                        <div key={index} className={`${i.bgColor} text-center rounded-xl p-2 line-clamb-1`}>{i.name}</div>
                    )))}
                </div>
            </div>
        </>
    )
}

export default MostSearchedByUsers
