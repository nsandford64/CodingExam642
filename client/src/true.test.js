import '@testing-library/jest-dom';
import React from 'react';

const Istrue = true; 
const Isfalse = false;

describe('Is true true? & Is false false', () => {
    test('Does this work?', () => {
        expect(Istrue).toBe(true);
        expect(Isfalse).toBe(false);
    });
});