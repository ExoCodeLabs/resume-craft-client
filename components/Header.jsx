import Link from "next/link"
import React from "react"

const Header = () => {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-6">
      <Link href="#" prefetch={false}>
        {/* <MountainIcon className="h-6 w-6" /> */}
        <span className="sr-only">ResumeCraft-AI</span>
      </Link>
      {/* <div className="flex items-center gap-4">
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="overflow-hidden rounded-full"
        >
          <img
            src="/placeholder.svg"
            width={36}
            height={36}
            alt="Avatar"
            className="overflow-hidden rounded-full"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>John Doe</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div> */}
    </header>
  )
}

export default Header
