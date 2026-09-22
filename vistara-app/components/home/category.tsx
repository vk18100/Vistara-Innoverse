"use client";
import Card from "./Cards";
type Card ={
    id:number;
    title:string;
    description:string;
    image:string;
    cta:string;
    href:string;

}

type Props = {
    cards: Card[]
}

export default function Category({ cards }: Props){
return(
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
            <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wide">Plan your Journey</p>
            <h2 >
            explore our curated categories to find the perfect destination for your next adventure.
            </h2>
            </div>
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {cards.map((card)=>(
<Card 

id={card.id} 
title={card.title}
description={card.description}
 image={card.image} 

 cta={card.cta} 
 href={card.href}/>

    ))}
    </div>
    </section>
)
 
}