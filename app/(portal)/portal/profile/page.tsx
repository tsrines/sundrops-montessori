'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CheckCircle } from 'lucide-react';
import { useSession } from '@/lib/auth-client';
import { api } from '@/lib/api-client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const profileSchema = z.object({
  phone: z.string().max(20).optional().or(z.literal('')),
  address: z.string().optional().or(z.literal('')),
  city: z.string().max(100).optional().or(z.literal('')),
  state: z.string().max(2).optional().or(z.literal('')),
  zip: z.string().max(10).optional().or(z.literal('')),
  emergencyContactName: z.string().optional().or(z.literal('')),
  emergencyContactPhone: z.string().max(20).optional().or(z.literal('')),
});

type ProfileValues = z.infer<typeof profileSchema>;

interface ProfileData {
  phone?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  zip?: string | null;
  emergencyContactName?: string | null;
  emergencyContactPhone?: string | null;
}

export default function ProfilePage() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await api.get<{ user: unknown; profile: ProfileData | null }>('/api/portal/me');
        if (res.profile) {
          reset({
            phone: res.profile.phone || '',
            address: res.profile.address || '',
            city: res.profile.city || '',
            state: res.profile.state || '',
            zip: res.profile.zip || '',
            emergencyContactName: res.profile.emergencyContactName || '',
            emergencyContactPhone: res.profile.emergencyContactPhone || '',
          });
        }
      } catch {
        // Non-critical
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, [reset]);

  const onSubmit = async (data: ProfileValues) => {
    setSaveError(null);
    setSaved(false);
    try {
      await api.put('/api/portal/me', data);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      setSaveError('Failed to save profile. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-semibold">My Profile</h1>
        <p className="mt-1 text-muted-foreground">Manage your contact and emergency information.</p>
      </div>

      {/* Account Info (read-only) */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Account</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div>
            <span className="text-muted-foreground">Name: </span>
            <span className="font-medium">{session?.user?.name}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Email: </span>
            <span className="font-medium">{session?.user?.email}</span>
          </div>
        </CardContent>
      </Card>

      {/* Editable Profile */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Contact Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {saveError && <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{saveError}</div>}
            {saved && (
              <div className="flex items-center gap-2 rounded-md bg-green-50 p-3 text-sm text-green-700">
                <CheckCircle className="h-4 w-4" />
                Profile saved successfully.
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="profile-phone">Phone</Label>
              <Input id="profile-phone" type="tel" placeholder="(843) 555-0123" {...register('phone')} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="profile-address">Address</Label>
              <Input id="profile-address" placeholder="123 Main St" {...register('address')} />
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="profile-city">City</Label>
                <Input id="profile-city" placeholder="Charleston" {...register('city')} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="profile-state">State</Label>
                <Input id="profile-state" placeholder="SC" maxLength={2} {...register('state')} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="profile-zip">Zip</Label>
                <Input id="profile-zip" placeholder="29403" {...register('zip')} />
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="mb-3 text-sm font-medium">Emergency Contact</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="profile-ec-name">Contact Name</Label>
                  <Input id="profile-ec-name" placeholder="Full name" {...register('emergencyContactName')} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="profile-ec-phone">Contact Phone</Label>
                  <Input
                    id="profile-ec-phone"
                    type="tel"
                    placeholder="(843) 555-0123"
                    {...register('emergencyContactPhone')}
                  />
                </div>
              </div>
            </div>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save Profile'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
