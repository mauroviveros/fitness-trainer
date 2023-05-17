export interface DialogAction{
    _id: string
    label: string
  }

export interface DialogContent{
    title: string
    icon: string
    text: string
    action?: DialogAction
}