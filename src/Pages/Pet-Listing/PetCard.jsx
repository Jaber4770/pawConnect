import React from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router';

export default function PetCard({ pet }) {
    return (
        <div className="bg-white rounded shadow p-4 flex flex-col">
            <img src={pet.image} alt={pet.name} className="w-full h-48 object-cover rounded mb-4" />
            <h3 className="text-lg font-semibold">{pet.name}</h3>
            <p>Age: {pet.age}</p>
            <p>Location: {pet.location}</p>
            <Link to='pet-details'>
                <Button variant="contained" color="primary" className="mt-auto">
                    View Details
                </Button>
            </Link>
        </div>
    );
}
