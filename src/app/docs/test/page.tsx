import { SmartChatPanel } from '~/registry/new-york/blocks/smart-chat-panel'
import { SmartDialog } from '~/registry/new-york/blocks/smart-dialog'
import { SmartLayout } from '~/registry/new-york/blocks/smart-panel'

export default async function Page() {
  return (
    <div>
      <SmartLayout>
        <SmartDialog
          defaultValue="le monde est beau"
          context="description du monde"
        />
        <SmartChatPanel
          triggerPosition={{ vertical: 'bottom', horizontal: 'center' }}
          side="right"
        />
      </SmartLayout>
    </div>
  )
}
