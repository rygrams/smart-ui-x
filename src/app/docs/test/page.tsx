import { SmartDialog } from '~/registry/new-york/blocks/smart-dialog'
import { SmartSheet } from '~/registry/new-york/blocks/smart-panel'

export default async function Page() {
  return (
    <div>
      <SmartDialog
        defaultValue="le monde est beau"
        context="description du monde"
        tasks={['correction', 'explanation']}
      />
      <SmartSheet
        triggerPosition={{ vertical: 'bottom', horizontal: 'center' }}
        side="right"
      />
    </div>
  )
}
