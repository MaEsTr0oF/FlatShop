import { useEffect, useRef } from 'react';
import styles from './ConnectionLines.module.css';

interface Point {
  x: number;
  y: number;
}

interface Connection {
  start: Point;
  end: Point;
}

interface ConnectionLinesProps {
  nodeRefs: {
    [key: string]: HTMLDivElement | null;
  };
  parentChildMapping: {
    [key: string]: string[];
  };
}

export const ConnectionLines = ({ nodeRefs, parentChildMapping }: ConnectionLinesProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawLine = (ctx: CanvasRenderingContext2D, start: Point, end: Point) => {
    console.log('Drawing line from', start, 'to', end);
    ctx.beginPath();
    ctx.setLineDash([6, 6]);
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.strokeStyle = '#E31235';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.setLineDash([]);
  };

  const getNodePosition = (element: HTMLDivElement): { top: Point, bottom: Point } => {
    const rect = element.getBoundingClientRect();
    const canvasRect = canvasRef.current?.getBoundingClientRect() || { left: 0, top: 0 };
    const centerX = rect.left + rect.width / 2 - canvasRect.left;
    
    return {
      top: {
        x: centerX,
        y: rect.top - canvasRect.top
      },
      bottom: {
        x: centerX,
        y: rect.bottom - canvasRect.top
      }
    };
  };

  const calculateConnections = (): Connection[] => {
    const connections: Connection[] = [];
    console.log('Parent-Child Mapping:', parentChildMapping);
    console.log('Node Refs:', nodeRefs);

    Object.entries(parentChildMapping).forEach(([parentId, childIds]) => {
      const parentNode = nodeRefs[parentId];
      if (!parentNode) {
        console.log('Parent node not found:', parentId);
        return;
      }

      if (childIds.length > 0) {
        const parentPos = getNodePosition(parentNode);
        const childNodes = childIds
          .map(id => nodeRefs[id])
          .filter((node): node is HTMLDivElement => node !== null);

        if (childNodes.length > 0) {
          const childPositions = childNodes.map(node => getNodePosition(node));
          const leftmostChild = childPositions[0];
          const rightmostChild = childPositions[childPositions.length - 1];
          
          const verticalGap = 20;
          const verticalLineY = parentPos.top.y - verticalGap;

          // Вертикальная линия от родителя
          connections.push({
            start: parentPos.top,
            end: { x: parentPos.top.x, y: verticalLineY }
          });

          // Горизонтальная линия между крайними детьми
          connections.push({
            start: { x: leftmostChild.bottom.x, y: verticalLineY },
            end: { x: rightmostChild.bottom.x, y: verticalLineY }
          });

          // Вертикальные линии к детям
          childPositions.forEach((childPos, index) => {
            const childId = childIds[index];
            const hasGrandchildren = parentChildMapping[childId]?.length > 0;
            
            // Если у узла нет детей, делаем линию короче
            const verticalEndY = hasGrandchildren ? childPos.bottom.y : childPos.bottom.y - 40;
            
            connections.push({
              start: { x: childPos.bottom.x, y: verticalLineY },
              end: { x: childPos.bottom.x, y: verticalEndY }
            });
          });
        }
      }
    });

    return connections;
  };

  const drawConnections = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) {
      console.log('Canvas or context not available');
      return;
    }

    const container = canvas.parentElement;
    if (!container) {
      console.log('Container not found');
      return;
    }

    const { width, height } = container.getBoundingClientRect();
    const scale = window.devicePixelRatio || 1;

    canvas.width = width * scale;
    canvas.height = height * scale;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.scale(scale, scale);
    console.log('Canvas dimensions:', width, height);

    ctx.clearRect(0, 0, width, height);

    const connections = calculateConnections();
    console.log('Connections to draw:', connections);
    connections.forEach(conn => drawLine(ctx, conn.start, conn.end));
  };

  useEffect(() => {
    console.log('Effect triggered');
    const timer = setTimeout(() => {
      drawConnections();
    }, 100);

    const handleResize = () => {
      console.log('Resize event');
      drawConnections();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, [nodeRefs, parentChildMapping]);

  return (
    <canvas 
      ref={canvasRef} 
      className={styles.canvas}
    />
  );
}; 