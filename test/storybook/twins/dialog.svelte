<!-- Svelte twins of packages/react/src/components/dialog/dialog.stories.tsx. -->
<script module lang="ts">
  import { Button, Dialog, Field, Heading, Label, Paragraph, EXPERIMENTAL_Suggestion as Suggestion } from '../../../src';
  import DialogNonModalRefStory from './dialog/DialogNonModalRef.svelte';
  import DialogWithFormStory from './dialog/DialogWithForm.svelte';
  import DialogWithOpenPropStory from './dialog/DialogWithOpenProp.svelte';
  import WithoutDialogTriggerContextStory from './dialog/WithoutDialogTriggerContext.svelte';

  export {
    Preview,
    WithoutDialogTriggerContext,
    DialogWithOpenProp,
    BackdropClosedbyAny,
    WithHeaderAndFooter,
    DialogWithForm,
    DialogWithMaxWidth,
    DialogWithSuggestion,
    DialogNonModal,
    DialogNonModalTrigger,
    DialogNonModalRef,
    DialogPlacementTop,
    DialogPlacementBottom,
    DialogPlacementLeft,
    DialogPlacementRight,
  };

  const DATA_PLACES = ['Sogndal', 'Oslo', 'Brønnøysund', 'Stavanger', 'Trondheim', 'Bergen', 'Lillestrøm'];
</script>

{#snippet Preview()}
  <Dialog.TriggerContext>
    <Dialog.Trigger>Open Dialog</Dialog.Trigger>
    <Dialog onClose={console.log}>
      <Heading style="margin-bottom: var(--ds-size-2)">Dialog header</Heading>
      <Paragraph style="margin-bottom: var(--ds-size-2)">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis doloremque obcaecati assumenda odio ducimus
        sunt et.
      </Paragraph>
      <Paragraph data-size="sm">Dialog footer</Paragraph>
    </Dialog>
  </Dialog.TriggerContext>
{/snippet}

{#snippet WithoutDialogTriggerContext()}<WithoutDialogTriggerContextStory />{/snippet}

{#snippet DialogWithOpenProp()}<DialogWithOpenPropStory />{/snippet}

{#snippet BackdropClosedbyAny()}
  <Dialog.TriggerContext>
    <Dialog.Trigger>Open Dialog</Dialog.Trigger>
    <Dialog closedby="any">
      <Heading>Dialog med <code>closedby="any"</code> og en veldig lang tittel</Heading>
      <Paragraph>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis doloremque obcaecati assumenda odio ducimus
        sunt et.
      </Paragraph>
      <Paragraph data-size="sm">Dialog footer</Paragraph>
    </Dialog>
  </Dialog.TriggerContext>
{/snippet}

{#snippet WithHeaderAndFooter()}
  <Dialog.TriggerContext>
    <Dialog.Trigger>Open Dialog</Dialog.Trigger>
    <Dialog>
      <Dialog.Block>
        <Paragraph data-size="sm">Her er det også divider</Paragraph>
        <Heading>Vi kan legge divider under header</Heading>
      </Dialog.Block>
      <Dialog.Block>
        <Paragraph style="margin-bottom: var(--ds-size-2)">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sodales eros justo. Aenean non mi ipsum. Cras
          viverra elit nec vulputate mattis. Nunc placerat euismod pulvinar. Sed nec fringilla nulla, sit amet ultricies
          ante. Morbi egestas venenatis massa, eu interdum leo rutrum eu. Nulla varius, mi ac feugiat lacinia, magna eros
          ullamcorper arcu, vel tincidunt erat leo nec tortor. Sed ut dui arcu. Morbi commodo ipsum hendrerit est imperdiet
          imperdiet. Etiam sed maximus nisi. Quisque posuere posuere orci, non egestas risus facilisis a. Vivamus non
          tempus felis, in maximus lorem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos
          himenaeos.
        </Paragraph>
        <Paragraph>
          Etiam nec tincidunt est. Integer semper sodales efficitur. Pellentesque pellentesque varius leo id congue.
          Integer lacinia porttitor massa id euismod. Maecenas porta, magna nec interdum eleifend, risus magna condimentum
          neque, a gravida nisl risus a elit. Donec accumsan metus et lectus placerat varius. Donec tristique odio arcu.
          Donec cursus leo a dui auctor pulvinar. Sed in elit urna. Nunc vitae magna sed nibh elementum dignissim et ut
          massa.
        </Paragraph>
      </Dialog.Block>
      <Dialog.Block>Og over footer</Dialog.Block>
    </Dialog>
  </Dialog.TriggerContext>
{/snippet}

{#snippet DialogWithForm()}<DialogWithFormStory />{/snippet}

{#snippet DialogWithMaxWidth()}
  <Dialog.TriggerContext>
    <Dialog.Trigger>Open Dialog</Dialog.Trigger>
    <Dialog style="max-width: 1200px">
      <Heading style="margin-bottom: var(--ds-size-2)">Dialog med en veldig lang bredde</Heading>
      <Paragraph>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis doloremque obcaecati assumenda odio ducimus
        sunt et.
      </Paragraph>
    </Dialog>
  </Dialog.TriggerContext>
{/snippet}

{#snippet DialogWithSuggestion()}
  <Dialog.TriggerContext>
    <Dialog.Trigger>Open Dialog</Dialog.Trigger>
    <Dialog style="overflow: visible" id="my-dialog">
      <Dialog.Block>
        <Heading>Dialog med suggestion</Heading>
      </Dialog.Block>
      <Dialog.Block>
        <Field>
          <Label>Velg en destinasjon</Label>
          <Suggestion>
            <Suggestion.Input />
            <Suggestion.Clear />
            <Suggestion.List>
              <Suggestion.Empty>Tomt</Suggestion.Empty>
              {#each DATA_PLACES as place (place)}
                <Suggestion.Option value={place}>
                  {place}
                  <div>Kommune</div>
                </Suggestion.Option>
              {/each}
            </Suggestion.List>
          </Suggestion>
        </Field>
      </Dialog.Block>
      <Dialog.Block>
        <Button variant="secondary" command="close" commandfor="my-dialog">Avbryt</Button>
      </Dialog.Block>
    </Dialog>
  </Dialog.TriggerContext>
{/snippet}

{#snippet DialogNonModal()}
  <Button command="--show-non-modal" commandfor="my-non-modal">Open Dialog</Button>
  <Dialog id="my-non-modal">
    <Heading>Non-modal dialog</Heading>
    <Paragraph>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis doloremque obcaecati assumenda odio ducimus
      sunt et.
    </Paragraph>
  </Dialog>
{/snippet}

{#snippet DialogNonModalTrigger()}
  <Dialog.TriggerContext>
    <Dialog.Trigger>Open non-modal dialog</Dialog.Trigger>
    <Dialog modal={false}>
      <Heading style="margin-bottom: var(--ds-size-4)">Let us know</Heading>
      <Paragraph style="margin-bottom: var(--ds-size-4)">
        We’d love to hear your feedback on our new design system. Please let us know what you think!
      </Paragraph>
      <Button variant="primary">Give feedback</Button>
    </Dialog>
  </Dialog.TriggerContext>
{/snippet}

{#snippet DialogNonModalRef()}<DialogNonModalRefStory />{/snippet}

{#snippet placed(placement: 'top' | 'bottom' | 'left', text: string)}
  <Dialog.TriggerContext>
    <Dialog.Trigger>Open Dialog</Dialog.Trigger>
    <Dialog {placement}>
      <Dialog.Block>
        <Paragraph>{text}</Paragraph>
      </Dialog.Block>
    </Dialog>
  </Dialog.TriggerContext>
{/snippet}

{#snippet DialogPlacementTop()}{@render placed('top', 'This is a Dialog with placement="top"')}{/snippet}
{#snippet DialogPlacementBottom()}{@render placed('bottom', 'This is a Dialog with placement="bottom"')}{/snippet}
{#snippet DialogPlacementLeft()}{@render placed('left', 'This is a Dialog with placement="left"')}{/snippet}
<!-- As upstream: the "right" story places the Dialog left. -->
{#snippet DialogPlacementRight()}{@render placed('left', 'This is a Dialog with placement="right"')}{/snippet}
