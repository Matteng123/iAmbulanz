<div class="Location">
	<div class="Location-body">
		<div class="Location-text">
				<h2><?php echo $section->headline()->html() ?></h2>
		</div>
		<div class="Location-item">
			<?php
			$locations = $site->standorte()->toStructure();
			$first = false;
			if($locations and $locations->count()): ?>
				<?php foreach($locations as $l): ?>
					<div class="Location-item-body">
						<h3><?php echo html($l->title()) ?></h3>
						<div>
							<p><a href="http://maps.google.com/?q=<?php echo $l->street().', '.$l->zip().' '.$l->city() ?>" target="_blank">› <?php echo html($l->street()) ?><br/>
								<?php echo html($l->zip()) ?>&nbsp;<?php echo html($l->city()) ?></a>
							</p>
							<p><strong>Kontakt:</strong></p>
							<table>
								<tr>
									<td>Telefon:&nbsp;&nbsp;</td>
									<td><?php echo $l->tel(); ?></td>
								</tr>
								<tr>
									<td>Mobil:</td>
									<td><?php echo $l->mobil(); ?></td>
								</tr>
								<tr>
									<td>E-Mail:</td>
									<td><a href="mailto:<?php echo $l->email(); ?>">› <?php echo html($l->email()); ?></a></td>
								</tr>
							</table>
							<p><strong>Öffnungszeiten:</strong></p>
							<table>
								<tr>
									<td>Mo. - Fr.:&nbsp;&nbsp;</td>
									<td><?php echo $l->timesweek(); ?></td>
								</tr>
								<tr>
									<td>Sa.: </td>
									<td><?php echo $l->timesweeken(); ?></td>
								</tr>
							</table>
						</div>
					</div>
				<?php endforeach ?>
			<?php endif ?>
		</div>
	</div>
</div>
