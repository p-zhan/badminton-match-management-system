'use server';

import {
  addMatchByDate,
  deleteMatchesById,
  getMatchDetailsById,
  getUserById,
  topUpUserBalance
} from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function addMatch(formData: FormData) {
  const date = String(formData.get('date'));
  const time = String(formData.get('time'));
  const dateTime = new Date(`${date} ${time}`).toISOString();

  try {
    await addMatchByDate(dateTime);
    revalidatePath('/');
  } catch (error) {
    console.log('🚀 ~ addMatch ~ error:', (error as any).stack);
    throw error;
  }
}

export async function getMatchDetails(id: string) {
  return await getMatchDetailsById(id);
}

export async function deleteMatch(id: string) {
  try {
    await deleteMatchesById(id);
    revalidatePath('/');
  } catch (error) {
    console.log('🚀 ~ deleteMatches ~ error:', (error as any).stack);
    throw error;
  }
}

export async function getUserByUserId(id: string) {
  return await getUserById(id);
}

export async function topUpBalance(id: string, amount: number) {
  try {
    await topUpUserBalance(id, amount);
    revalidatePath(`/players/${id}`);
  } catch (error) {
    console.log('🚀 ~ topUpBalance ~ error:', (error as any).stack);
    throw error;
  }
}