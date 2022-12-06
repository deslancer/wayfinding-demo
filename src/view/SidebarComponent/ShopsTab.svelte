<script>
    import {shops_list} from "../../controllers/store";
    import _ from 'lodash'
    let selected_shop = '';
    let shopsList = [ {} ];
    shops_list.subscribe( ( res ) => {
        shopsList = res
    } )
</script>
<h4 class="py-2">Shops</h4>
<ul class="list-group">
    {#if shops_list}
        {#each _.orderBy(shopsList, ['name'], ['asc']) as shop}
            <li class:list-active="{selected_shop === shop.name}"
                on:click="{() => selected_shop = shop.name}"
                    class="list-group-item d-flex justify-content-between align-items-start">
                <div class="ms-2 me-auto">
                    <div class="fw-bold">{shop.name}</div>
                    Linked to:
                </div>
            </li>
        {/each}
    {/if}
</ul>

