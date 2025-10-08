"use client";

import React from 'react'
import { ScrollArea } from './ui/scroll-area'
import { Card } from './ui/card'
import { Checkbox } from './ui/checkbox'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Button } from './ui/button';
import { CalendarIcon } from 'lucide-react';
import { formatDate } from "date-fns";
import { Calendar } from './ui/calendar';

export default function TodoList() {
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    const [open, setOpen] = React.useState(false);

    return (
        <div>
            <h1 className='text-lg font-medium mb-4'>Todo list</h1>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button className='w-full'>
                        <CalendarIcon />
                        {date ? formatDate(date, "do MMMM, yyyy") : <span>Pick a date</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className='p-0 w-auto'>
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={(date) => {
                            setDate(date);
                            setOpen(false);
                        }}
                        className="rounded-lg border"
                    />
                </PopoverContent>
            </Popover>

            <ScrollArea className='max-h-[450px] mt-4 overflow-y-auto'>

                {/* List items */}
                <div className="flex flex-col gap-4">
                    {
                        Array.from({ length: 20 }, () => 0).map((_, i) => (
                            <Card className='p-4' key={i}>
                                <div className="flex item-center gap-4">
                                    <Checkbox id="item1" checked={i % 2 == 0} />
                                    <label htmlFor="item1" className='text-muted-foreground text-sm'>Lorem ipsum dolor sit amet consectetur.</label>
                                </div>
                            </Card>
                        ))
                    }
                </div>
            </ScrollArea>
        </div>
    )
}
