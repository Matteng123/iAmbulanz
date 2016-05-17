	<?php
	$links = $section->links()->toStructure();
	if($links and $links->count()): ?>
		<div class="Tabbar--links">
			<div class="Tabbar--links-body">
				<ul>
					<?php foreach($links as $item): ?>
						<li class="Tabbar-item<?php if($item->active() == "true") echo ' Tabbar-item--active' ?>">
							<a href="<?php echo html($item->link()) ?>"><span><?php echo html($item->label()) ?></span></a>
						</li>
					<?php endforeach ?>
				</ul>
			</div>
		</div>
	<?php endif ?>
