'use client';

import { useEffect, useState } from 'react';
import { Trash2 } from 'lucide-react';
import { api } from '@/lib/api-client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PizzaOrderPortalForm } from '@/components/portal/pizza-order-portal-form';
import { cn } from '@/lib/utils';

interface Child {
  id: string;
  firstName: string;
  lastName: string;
  classroom: string | null;
}

interface PizzaOrder {
  id: string;
  childId: string;
  classRoom: string;
  orderDate: string;
  sliceCount: number;
  status: string;
}

export default function PizzaOrdersPage() {
  const [children, setChildren] = useState<Child[]>([]);
  const [orders, setOrders] = useState<PizzaOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [childrenRes, ordersRes] = await Promise.all([
          api.get<{ children: Child[] }>('/api/portal/children'),
          api.get<{ orders: PizzaOrder[] }>('/api/portal/pizza-orders'),
        ]);
        setChildren(childrenRes.children);
        setOrders(ordersRes.orders);
      } catch {
        // Non-critical
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleCancel = async (orderId: string) => {
    try {
      await api.delete(`/api/portal/pizza-orders/${orderId}`);
      setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status: 'cancelled' } : o)));
    } catch {
      // Failed to cancel
    }
  };

  const getChildName = (childId: string) => {
    const child = children.find((c) => c.id === childId);
    return child ? `${child.firstName} ${child.lastName}` : 'Unknown';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  const activeOrders = orders.filter((o) => o.status !== 'cancelled');

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <h1 className="font-serif text-2xl font-semibold">Pizza Orders</h1>
        <p className="mt-1 text-muted-foreground">Order pizza for your children on Pizza Fridays.</p>
      </div>

      {/* New Order Form */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Place New Order</CardTitle>
        </CardHeader>
        <CardContent>
          <PizzaOrderPortalForm childList={children} />
        </CardContent>
      </Card>

      {/* Existing Orders */}
      {activeOrders.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Your Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="divide-y">
              {activeOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-sm font-medium">{getChildName(order.childId)}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(order.orderDate + 'T12:00:00').toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'short',
                        day: 'numeric',
                      })}{' '}
                      - {order.sliceCount} slice{order.sliceCount > 1 ? 's' : ''} - {order.classRoom}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        'rounded-full px-2 py-0.5 text-xs font-medium',
                        order.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      )}>
                      {order.status}
                    </span>
                    {order.status === 'pending' && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() => handleCancel(order.id)}>
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
