import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import TaskItem from './TaskItem'
import EmptyState from './EmptyState'

export default function TaskList({ tasks, filter, search, onToggle, onDelete, onEdit, onReorder }) {
  const panelClassName = 'rounded-[28px] border border-[#e7ddce] bg-white/82 p-3 shadow-[0_22px_46px_-36px_rgba(68,64,60,0.34)] dark:border-stone-800/70 dark:bg-stone-900/65 dark:shadow-[0_22px_46px_-36px_rgba(0,0,0,0.55)] sm:p-4'

  function handleDragEnd(result) {
    if (!result.destination) return
    if (result.destination.index === result.source.index) return
    onReorder(result.source.index, result.destination.index)
  }

  if (tasks.length === 0) {
    return (
      <div className={panelClassName}>
        <EmptyState filter={filter} search={search} />
      </div>
    )
  }

  return (
    <div className={panelClassName}>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="tasks">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`space-y-2 transition-all duration-200 ${snapshot.isDraggingOver ? 'space-y-3' : ''}`}
            >
              {tasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(dragProvided, dragSnapshot) => (
                    <div
                      ref={dragProvided.innerRef}
                      {...dragProvided.draggableProps}
                      className={`stagger-${Math.min(index, 7)}`}
                    >
                      <TaskItem
                        task={task}
                        onToggle={onToggle}
                        onDelete={onDelete}
                        onEdit={onEdit}
                        dragHandleProps={dragProvided.dragHandleProps}
                        isDragging={dragSnapshot.isDragging}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}
