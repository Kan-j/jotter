import React from 'react'

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
  } from "@/components/ui/dialog"
import { useSettings } from '@/hooks/use-settings';
import { Label } from '../ui/label';
import { ModeToggle } from '../mode-toggle';



const SettingsModal = () => {
    const settings = useSettings();
  return (
    <Dialog open={settings.isOpen} onOpenChange={settings.onClose}>
        <DialogContent>
            <DialogHeader className='border-b pb-3'>
                <DialogTitle><h3 className="text-lg font-medium">
                     My settings
                </h3></DialogTitle>
            </DialogHeader>
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-y-1">
                    <Label>
                        Appearance
                    </Label>
                    <span className="text-[0.8rem] text-muted-foreground">
                        Customize how Jotter looks on your device
                    </span>
                    
                </div>
                <ModeToggle/>
            </div>
        </DialogContent>
    </Dialog>
  )
}

export default SettingsModal