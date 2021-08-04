/****************************************************************
 Описание
 Вам дается квадратная сетка с обычными `.` и заблокированными `X` ячейками.
 Ваша игровая фигура может перемещаться по любой строке или столбцу или диагонали, пока не достигнет края сетки или заблокированной ячейки.
 Учитывая сетку, начальную и конечную позиции, постройте кратчайший путь, чтобы добраться до конечной позиции.
 
 Например
 Дана сетка:
 .X.
 .X.
 ...
 
 Система координаты для данной сетки:
 0.0 0.1 0.2
 1.0 1.1	1.2
 2.0	2.1	2.2
 
 Начальна позиция 2.1 (отсчет идет с верхнего левого края сетки 0.0)
 Конечная позиция 0.2
 
 Путь движения между начальной и конечной точкой: (2.1) -> (1.2) -> (0.2)
 Ответ: [{x:2, y:1}, {x:1, y:2}, {x:0, y:2}]
 
 Задача
 Завершите выполнение функции в редакторе. Функция должена вывести массив объектов координат которые обеспечивают минимальное количество шагов для перехода от начальной позиции к конечной и порядок массива соответвует движения по координатам.
 
 Ограничения
 Длина сетки > 1 и < 100
 Координата начальной и конечной точки входит в предоставленную сетку.
 Задача должна быть решена с использованием ООП
 
 ****************************************************************/

class Coordinate {
  constructor(coordinateX, coordinateY, distance, previous) {
    this.x = coordinateX;
    this.y = coordinateY;
    this.distance = distance;
    this.previous = previous;
  }
}

class Goal {
  constructor(coordinateX, coordinateY) {
    this.x = coordinateX;
    this.y = coordinateY;
  }
}

function runner(gridList, startX, startY, endX, endY) {
  let possibility = false;
  const goal = new Goal(endX, endY);
  const queue = [new Coordinate(startX, startY, 0, null)];
  const directions = [[-1, 0], [-1, -1], [-1, 1], [0, 1], [0, -1], [1, 1], [1, 0], [1, -1]];
  let visited = [];
  while (queue.length>0) {
    const current = queue[0];
    visited.push(current)
    queue.shift();
    for (let i=0; i<directions.length; i++) {
      const neighbourX = current.x + directions[i][0];
      const neighbourY = current.y + directions[i][1];
      let flag = 0;
      if (neighbourX >= 0 && neighbourX < gridList.length && neighbourY >= 0 && neighbourY < gridList[0].length &&
        gridList[neighbourX][neighbourY] !== 'X') {
        visited.forEach((point) => {
          if (point.x === neighbourX && point.y === neighbourY)
            flag = 1;
        })
        if (!flag) {
          queue.push(new Coordinate(neighbourX, neighbourY, current.distance + 1, current))
          if (goal.x === neighbourX && goal.y === neighbourY) {
            visited.push(new Coordinate(neighbourX, neighbourY, current.distance + 1, current))
            possibility = true;
            break;
          }
        }
      }
    }
    if (possibility)
      break
    }
  if (!possibility)
    return possibility
  let output = [];
  let curr = visited[visited.length-1];
  while (curr.previous) {
    output.push(curr)
    visited.pop();
    curr = curr.previous;
  }
  output = output.reverse();
  output.unshift(new Coordinate(startX, startY, 0, null))
  return output.map((item) => {return {x: item.x, y: item.y}});
}

const result = console.log(runner(
  [
    '.X.X',
    '.X.X',
    '...X',
    '.XX.'
  ],
  0, 0,
  3, 3
));
