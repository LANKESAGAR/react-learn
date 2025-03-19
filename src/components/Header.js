import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { NavLink } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { LoginContext } from '../App'

const navigation = [
    { name: 'Employees', href: '/employees' },
    { name: 'Customers', href: '/customers' },
    { name: 'Dictionary', href: '/dictionary' }
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Header(props) {
    const [loggedIn, setLoggedIn] = useContext(LoginContext);

    return (
        <>
            <Disclosure as="nav" className="bg-gray-800">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-14 items-center justify-between">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            {/* Mobile menu button*/}
                            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
                                <span className="absolute -inset-0.5" />
                                <span className="sr-only">Open main menu</span>
                                <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
                                <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
                            </DisclosureButton>
                        </div>
                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="hidden sm:ml-6 sm:block">
                                <div className="flex space-x-4">
                                    {navigation.map((item) => (
                                        <NavLink
                                            key={item.name}
                                            to={item.href}
                                            className={({ isActive }) => {
                                                return ('rounded-md px-3 py-2 text-sm font-medium no-underline ' +
                                                    (isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white')
                                                );
                                            }}
                                        >
                                            {item.name}
                                        </NavLink>
                                    ))}
                                    {
                                    loggedIn ?
                                    <NavLink
                                        to={'/logout'}
                                        onClick={()=>{
                                            setLoggedIn(false);
                                            localStorage.clear();
                                        }}
                                        className="rounded-md px-3 py-2 text-sm font-medium no-underline text-gray-300 hover:bg-gray-700 hover:text-white"
                                    >
                                        Logout
                                    </NavLink> :
                                    <NavLink
                                        to={'/login'}
                                        className="rounded-md px-3 py-2 text-sm font-medium no-underline text-gray-300 hover:bg-gray-700 hover:text-white"
                                    >
                                        Login
                                    </NavLink>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            <button
                                type="button"
                                className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
                            >
                                <span className="absolute -inset-1.5" />
                                <span className="sr-only">View notifications</span>
                                <BellIcon aria-hidden="true" className="size-6" />
                            </button>

                        </div>
                    </div>
                </div>

                <DisclosurePanel className="sm:hidden">
                    <div className="space-y-1 px-2 pt-2 pb-3">
                        {navigation.map((item) => (
                            <NavLink
                                key={item.name}
                                to={item.href}
                                onClick={()=>{
                                    setLoggedIn(false);
                                    localStorage.clear();
                                }}
                                className={({ isActive }) => {
                                    return ('block rounded-md px-3 py-2 text-base font-medium no-underline ' +
                                        (isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white')
                                    );
                                }}
                            >
                                {item.name}
                            </NavLink>
                        ))}
                        { loggedIn ?
                        <NavLink
                                to={'/logout'}
                                onClick={()=>{
                                    setLoggedIn(false);
                                    localStorage.clear();
                                }}
                                className="rblock rounded-md px-3 py-2 text-base font-medium no-underline text-gray-300 hover:bg-gray-700 hover:text-white"
                            >
                                Logout
                            </NavLink> :
                            <NavLink
                                to={'/login'}
                                className="rblock rounded-md px-3 py-2 text-base font-medium no-underline text-gray-300 hover:bg-gray-700 hover:text-white"
                            >
                                Login
                            </NavLink>
                        }
                    </div>
                </DisclosurePanel>
            </Disclosure>
            <div className="bg-gray-300">
                <div className="max-w-7xl mx-auto bg-gray-300 min-h-screen px-3 py-2">
                    {props.children}
                </div>
            </div>
        </>
    )
}
