import DialogRoot from './Dialog.svelte';
import DialogBlock from './DialogBlock.svelte';
import DialogTrigger from './DialogTrigger.svelte';
import DialogTriggerContext from './DialogTriggerContext.svelte';
const Dialog = Object.assign(DialogRoot, { Block: DialogBlock, TriggerContext: DialogTriggerContext, Trigger: DialogTrigger });
export { Dialog, DialogBlock, DialogTrigger, DialogTriggerContext };
