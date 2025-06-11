import { ShoppingBagIcon, ShoppingCartIcon, UserGroupIcon, UsersIcon } from "@heroicons/react/20/solid";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import apiRoutes from "../../../../../Constants/apiRoutes";

const fetchProduct = async () => {
    const response = await fetch(apiRoutes.getProductCount);
    const data = response.json();
    return data
}
const fetchUsers = async () => {
    const response = await fetch(apiRoutes.getUserCount);
    const data = response.json();
    return data
}

function OverallStatistics() {

    const queryClient = useQueryClient();

    const { data: userCount, isPending: userPending, isError: isErrorUser, error: userError }: any = useQuery({
        queryKey: ['userCount'],
        queryFn: fetchUsers,
        staleTime: 60000,
        gcTime: 3000000,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
    })

    const { data: productCount, isPending: productPending, isError: isErrorProduct, error: productError }: any = useQuery({
        queryKey: ['productCount'],
        queryFn: fetchProduct,
        staleTime: 60000,
        gcTime: 3000000,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
    })

    const user = userPending ? (<span className="text-sm">Loading...</span>) : (<span>{userCount}</span>);
    const product = productPending ? (<span className="text-sm">Loading...</span>) : (<span>{productCount}</span>);

    if (isErrorUser || isErrorProduct) {
        return <span className="text-slate-600 font-semibold text-sm">Error receiving data from the server</span>
    }

    return (
        <>
            <div className="p-4 text-center bg-white rounded-lg flex justify-center shadow-md dark:bg-gray-900">
                <div className="grid grid-cols-2 gap-10 md:gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    <div className="box bg-orange-100 dark:bg-orange-400" title={`The number of users is equal to ${user}`}>
                        <p className="sr-only">the number of users is equal to {user}</p>
                        <UserGroupIcon className="iconInCountBox bg-orange-400" />
                        <p className="textCount">{user}</p>
                        <p className="text-lg font-bold text-sky-950">Users</p>
                    </div>
                    <div className="box bg-yellow-100 dark:bg-yellow-400" title={`The number of products is equal to ${product}`}>
                        <p className="sr-only">The number of products is equal to {product}</p>
                        <ShoppingBagIcon className="iconInCountBox bg-yellow-400" />
                        <p className="textCount" title="">{product}</p>
                        <p className="text-lg font-bold text-sky-950">Products</p>
                    </div>
                    <div className="box bg-green-100 dark:bg-green-400" title={`The number of Orders is equal to 0`}>
                        <p className="sr-only">The number of Orders is equal to 0</p>
                        <ShoppingCartIcon className="iconInCountBox bg-green-400" />
                        <p className="textCount" title="">0</p>
                        <p className="text-lg font-bold text-sky-950" title="All Users Registered In MyWeb">Orders</p>
                    </div>
                    <div className="box bg-violet-100 dark:bg-violet-400" title={`The number of Customers is equal to 0`}>
                        <p className="sr-only">The number of Customers is equal to 0</p>
                        <UsersIcon className="iconInCountBox bg-violet-400" />
                        <p className="textCount" title="">0</p>
                        <p className="text-lg font-bold text-sky-950" title="All Users Registered In MyWeb">Customers</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OverallStatistics
