"use client"
import { Spinner } from '@/components/spinner'
import { Button } from '@/components/ui/button'
import { SignInButton } from '@clerk/clerk-react'
import { useConvexAuth } from 'convex/react'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Heading = () => {
  const {isAuthenticated, isLoading} = useConvexAuth();
  return (
    <div className='max-w-3xl space-y-4'>
        <h1 className='text-3xl sm:text-5xl md:text-6xl font-bold'>
        Your Reading, Notes, & Ideas. Unified. Welcome to <span className="underline">Jotter</span>
        </h1>
        <h3 className="text-base sm:text-xl md:text-2xl font-medium">
             Jotter is the personal workspace where <br/>
            your best ideas come together.
        </h3>
        {isLoading && (
          <div className="w-full flex items-center justify-center">
             <Spinner size="lg"/>
          </div>
        )}
        {!isAuthenticated && !isLoading && (
          <>
            <SignInButton mode="modal">
              <Button>
                Get Jotter free
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </SignInButton>
          </>
          
        )}
        {isAuthenticated && !isLoading && (
        <Button asChild>
            <Link href="/documents">
                Enter Jotter
                <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
        </Button>
    )}
        
        
    </div>
  )
}

export default Heading