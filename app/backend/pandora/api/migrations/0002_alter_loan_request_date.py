# Generated by Django 4.2.5 on 2023-12-07 11:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='loan',
            name='request_date',
            field=models.DateField(auto_now_add=True),
        ),
    ]
