import { useMemo } from "react";

export default function useSearchTasks(tasks, search){
    return useMemo( () => {
        console.log('USE Callback')
        if (search) {
          const lowerSearch = search.toLowerCase()
          return [...tasks].filter(task => {
            return task.title.toLocaleLowerCase().includes(lowerSearch) || task.description.toLocaleLowerCase().includes(lowerSearch)
          })
        }
        return tasks
      }, [tasks, search])
}