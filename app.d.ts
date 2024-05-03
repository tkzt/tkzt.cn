declare interface BlogGroup {
  year: string
  list: {
    title: string
    date: string
    link: string
    local?: boolean
  }[]
}

interface BlogResponse {
  title: string
  link: string
  date: string
}