import { Dialog } from '~/components/ui/dialog'
import {
  SmartDialogContent,
  SmartDialogTrigger,
} from '~/registry/new-york/blocks/smart-dialog'

export default async function Page() {
  return (
    <div>
      <Dialog>
        <SmartDialogTrigger />
        <SmartDialogContent
          defaultValue="le monde est beau"
          context="description du monde"
        />
      </Dialog>
    </div>
  )
}
