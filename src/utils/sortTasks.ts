// Função genérica para ordenar o array de tasks
//
// O método .sort() recebe uma função que compara dois itens (a, b) e deve retornar:
// - Um número NEGATIVO (-1) se "a" deve vir antes de "b".
// - Um número POSITIVO (1) se "a" deve vir depois de "b".
// - ZERO (0) se não precisa mudar a ordem.
//
// A função cuida de:
// 1. Se o valor for null, joga pro final da lista.
// 2. Se for número, ordena numericamente (asc ou desc).
// 3. Se for string, ordena alfabeticamente (asc ou desc).
//
// O spread [...tasks] cria uma cópia do array original para não alterar ele direto.

import type { TaskModel } from '../models/TaskModel';

export type SortTasksOptions = {
  tasks: TaskModel[];
  direction?: 'asc' | 'desc';
  field?: keyof TaskModel;
};

export function sortTasks({
  field = 'startDate',
  direction = 'desc',
  tasks = [],
}: SortTasksOptions): TaskModel[] {
  return [...tasks].sort((a, b) => {
    const aValue = a[field];
    const bValue = b[field];

    // --- TRATANDO VALORES NULOS ---

    // Se os dois forem nulos, mantemos a ordem atual
    if (aValue === null && bValue === null) return 0;

    // Se apenas o primeiro for nulo, ele vai para o final
    if (aValue === null) return 1;

    // Se apenas o segundo for nulo, ele vai para o final
    if (bValue === null) return -1;

    // --- COMPARAÇÃO NUMÉRICA ---

    // Se os dois valores forem números, fazemos uma subtração para ordenar
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return direction === 'asc'
        ? aValue - bValue // Ex: 1, 2, 3...
        : bValue - aValue; // Ex: 3, 2, 1...
    }

    // --- COMPARAÇÃO DE STRINGS ---

    // Se os dois valores forem textos, usamos localeCompare para comparar em ordem alfabética
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return direction === 'asc'
        ? aValue.localeCompare(bValue) // A -> Z
        : bValue.localeCompare(aValue); // Z -> A
    }

    // --- CASOS NÃO TRATADOS ---

    // Se não for nem número, nem string, nem null, não alteramos a ordem
    return 0;
  });
}