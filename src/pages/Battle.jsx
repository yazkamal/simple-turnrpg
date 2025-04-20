import React from 'react'
import { useParams } from 'react-router-dom'
import { chapters } from '../data/chapters';
import { enemies } from '../data/enemies';
import { characters } from '../data/characters';
import Screen from '../component/Screen';

export default function Battle() {
    const {id} = useParams();
    const chapter = chapters.find(one => one.id == id);
    const enemy = enemies.find(one => one.id == chapter.enemyId)
    const character = characters[0]
    return (
        <>
            <Screen character={character} enemy={enemy} />
        </>
    )
}
