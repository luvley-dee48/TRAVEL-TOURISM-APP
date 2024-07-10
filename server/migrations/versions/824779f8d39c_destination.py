"""destination

Revision ID: 824779f8d39c
Revises: 89219705fd61
Create Date: 2024-07-10 09:44:00.140174

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '824779f8d39c'
down_revision = '89219705fd61'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('destinations',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=80), nullable=True),
    sa.Column('description', sa.Text(), nullable=True),
    sa.Column('location', sa.String(length=80), nullable=True),
    sa.Column('image_url', sa.String(length=120), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('planned_trips',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('name', sa.String(length=80), nullable=True),
    sa.Column('description', sa.Text(), nullable=True),
    sa.Column('start_date', sa.Date(), nullable=True),
    sa.Column('end_date', sa.Date(), nullable=True),
    sa.Column('destination', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['destination'], ['users.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.drop_table('planned_trip')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('planned_trip',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('user_id', sa.INTEGER(), nullable=True),
    sa.Column('name', sa.VARCHAR(length=80), nullable=True),
    sa.Column('description', sa.TEXT(), nullable=True),
    sa.Column('start_date', sa.DATE(), nullable=True),
    sa.Column('end_date', sa.DATE(), nullable=True),
    sa.Column('destination', sa.INTEGER(), nullable=True),
    sa.ForeignKeyConstraint(['destination'], ['users.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.drop_table('planned_trips')
    op.drop_table('destinations')
    # ### end Alembic commands ###
